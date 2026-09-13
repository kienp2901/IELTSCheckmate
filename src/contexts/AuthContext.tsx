import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { api } from '@/api/api';
import { portalApi } from '@/api/portal-api';

// Simple UUID v4 generator
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface IAuthUser {
  id?: number;
  email?: string;
  name?: string;
  token?: string;
  sessionId?: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IAuthUser | null;
  login: () => void | Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AUTH_STORAGE_KEY = 'ielts_checkmate_auth';
const SESSION_STORAGE_KEY = 'ielts_checkmate_session_id';
const SESSION_TOKEN_KEY = 'ielts_checkmate_session_token'; // Session cookie equivalent

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
 
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  const clearAuth = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  }, []);

  const persistAuth = useCallback((authData: IAuthUser) => {
    setUser(authData);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    if (authData.token) {
      sessionStorage.setItem(SESSION_TOKEN_KEY, authData.token);
    }
  }, []);

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await portalApi.student.getInfo(token);
      return !!(response.status && response.data);
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  /**
   * Silent refresh qua LMS BFF.
   * Browser gửi refreshToken (Path=/lms) kèm request tới /lms/api/token/refresh
   * dù đang đứng ở trang /. LMS cũng Set-Cookie wp_user_token Path=/.
   */
  const refreshFromLms = async (): Promise<string | null> => {
    const domainFe = process.env.DOMAIN_FE;
    if (!domainFe) {
      return null;
    }

    try {
      const response = await fetch(`${domainFe}/api/token/refresh`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (data?.status && data?.accessToken) {
        return data.accessToken as string;
      }
      return null;
    } catch (error) {
      console.error('LMS token refresh failed:', error);
      return null;
    }
  };

  const buildAuthFromToken = (token: string, sessionId?: string): IAuthUser => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        return {
          ...parsed,
          token,
          ...(sessionId ? { sessionId } : {}),
        };
      } catch {
        // fall through
      }
    }
    return { token, ...(sessionId ? { sessionId } : {}) };
  };

  /** Nguồn tin cậy: wp_user_token (Path=/) hoặc LMS refresh. Không dùng sessionStorage một mình — tránh lệch logout LMS. */
  const restoreSession = async (): Promise<boolean> => {
    const wpUserToken = getCookie('wp_user_token');

    if (wpUserToken) {
      const isValid = await verifyToken(wpUserToken);
      if (isValid) {
        persistAuth(buildAuthFromToken(wpUserToken));
        return true;
      }
      // JWT hết ~15 phút: thử refresh trước khi coi như logout
      const refreshed = await refreshFromLms();
      if (refreshed) {
        const refreshedValid = await verifyToken(refreshed);
        if (refreshedValid) {
          persistAuth(buildAuthFromToken(refreshed));
          return true;
        }
      }
      // Cookie còn nhưng session LMS đã chết (logout / hết refresh) → xóa cả sessionStorage
      clearAuth();
      return false;
    }

    // Không có wp_user_token: chỉ còn cơ hội nếu LMS vẫn còn refreshToken Path=/lms
    const refreshed = await refreshFromLms();
    if (refreshed) {
      const refreshedValid = await verifyToken(refreshed);
      if (refreshedValid) {
        persistAuth(buildAuthFromToken(refreshed));
        return true;
      }
    }

    // LMS logout đã xóa cookie + refresh 401 → bắt buộc clear sessionStorage/localStorage cũ
    clearAuth();
    return false;
  };

  // Verify session on mount
  useEffect(() => {
    const verifyStoredSession = async () => {
      try {
        await restoreSession();
      } finally {
        setIsLoading(false);
      }
    };

    verifyStoredSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check for session_id in URL query params (callback from FE login) — handshake một lần
  useEffect(() => {
    const checkSessionCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');

      if (!sessionId) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await api.sso.verifySession(sessionId);

        if ((response.success || response.status) && response.data?.token) {
          const token = response.data.token;
          const isTokenValid = await verifyToken(token);

          if (isTokenValid) {
            const userInfo = response.data.user_info || response.data.user;
            const authData: IAuthUser = {
              id: userInfo?._id || userInfo?.id || userInfo?.idStudent,
              email: userInfo?.email,
              name: userInfo?.firstName || userInfo?.name,
              token: token,
              sessionId: sessionId,
            };

            persistAuth(authData);
            sessionStorage.removeItem(SESSION_STORAGE_KEY);

            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          } else {
            clearAuth();
          }
        } else {
          console.error('Invalid session or no token received', response);
        }
      } catch (error) {
        console.error('Error verifying session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSessionCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    // Soft-check: nếu LMS vẫn còn refresh session → vào học luôn, khỏi form login
    setIsLoading(true);
    try {
      const restored = await restoreSession();
      if (restored) {
        window.location.href = `${process.env.DOMAIN_FE}/dashboard`;
        return;
      }
    } finally {
      setIsLoading(false);
    }

    const sessionId = generateUUID();
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    const loginUrl = `${process.env.DOMAIN_FE}/signin?session_id=${sessionId}`;
    window.location.href = loginUrl;
  };

  const logout = () => {
    clearAuth();
  };

  const isAuthenticated = !!user?.token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
