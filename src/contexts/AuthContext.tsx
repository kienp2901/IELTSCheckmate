import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AUTH_STORAGE_KEY = 'ielts_checkmate_auth';
const SESSION_STORAGE_KEY = 'ielts_checkmate_session_id';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to verify token by calling student info API
  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      console.log('🔑 Verifying token with student info API...');
      const response = await portalApi.student.getInfo(token);
      
      if (response.status && response.data) {
        console.log('✅ Token is valid, student info:', response.data);
        return true;
      } else {
        console.log('❌ Token invalid or no data returned');
        return false;
      }
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      return false;
    }
  };

  // Verify session from localStorage on mount
  useEffect(() => {
    const verifyStoredSession = async () => {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      console.log('🔍 Checking stored auth:', storedAuth);
      
      if (storedAuth) {
        try {
          const authData = JSON.parse(storedAuth);
          
          // Priority 1: If we have sessionId, verify session first
          if (authData.sessionId) {
            console.log('🔄 Verifying stored session with sessionId:', authData.sessionId);
            
            try {
              const response = await api.sso.verifySession(authData.sessionId);
              
              console.log('📦 Session verification response:', response);
              
              // Check if session is still valid and returns token
              if ((response.success || response.status) && response.data?.token) {
                const token = response.data.token;
                
                // Additional verification: check token with student info API
                const isTokenValid = await verifyToken(token);
                
                if (isTokenValid) {
                  // Both session and token valid, update auth data
                  const userInfo = response.data.user_info || response.data.user;
                  const updatedAuthData: IAuthUser = {
                    id: userInfo?._id || userInfo?.id || userInfo?.idStudent,
                    email: userInfo?.email,
                    name: userInfo?.firstName || userInfo?.name,
                    token: token,
                    sessionId: authData.sessionId,
                  };
                  
                  setUser(updatedAuthData);
                  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedAuthData));
                  console.log('✅ Session and token verified and updated:', updatedAuthData);
                } else {
                  // Token invalid, clear auth
                  console.log('❌ Token invalid, clearing auth');
                  setUser(null);
                  localStorage.removeItem(AUTH_STORAGE_KEY);
                  sessionStorage.removeItem(SESSION_STORAGE_KEY);
                }
              } else {
                // Session invalid, clear auth
                console.log('❌ Session invalid, clearing auth');
                setUser(null);
                localStorage.removeItem(AUTH_STORAGE_KEY);
                sessionStorage.removeItem(SESSION_STORAGE_KEY);
              }
            } catch (error) {
              // Session verification failed, clear auth
              console.error('❌ Session verification failed:', error);
              setUser(null);
              localStorage.removeItem(AUTH_STORAGE_KEY);
              sessionStorage.removeItem(SESSION_STORAGE_KEY);
            }
          } 
          // Priority 2: If only have token (no sessionId), verify token only
          else if (authData.token) {
            console.log('🔄 Verifying stored token (no sessionId)...');
            
            const isValid = await verifyToken(authData.token);
            
            if (isValid) {
              // Token is valid, restore user
              setUser(authData);
              console.log('✅ User restored from localStorage with valid token:', authData);
            } else {
              // Token expired or invalid, clear auth
              console.log('❌ Token expired, clearing auth');
              setUser(null);
              localStorage.removeItem(AUTH_STORAGE_KEY);
              sessionStorage.removeItem(SESSION_STORAGE_KEY);
            }
          } else {
            // No sessionId and no token, clear auth
            console.log('❌ No sessionId or token found, clearing auth');
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        } catch (error) {
          console.error('❌ Error parsing auth data:', error);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
      
      setIsLoading(false);
    };
 
    verifyStoredSession();
  }, []);

  // Check for session_id in URL query params (callback from FE login)
  useEffect(() => {
    const checkSessionCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');
      
      if (sessionId) {
        setIsLoading(true);
        console.log('🔄 Verifying session from URL:', sessionId);
        
        try {
          // Call API to verify session and get token
          const response = await api.sso.verifySession(sessionId);
          
          console.log('📦 API Response:', response);
          
          // Check for both 'success' and 'status' fields (API returns 'success')
          if ((response.success || response.status) && response.data?.token) {
            const token = response.data.token;
            
            // Verify token with student info API
            const isTokenValid = await verifyToken(token);
            
            if (isTokenValid) {
              // Token is valid, save auth data
              const userInfo = response.data.user_info || response.data.user;
              const authData: IAuthUser = {
                id: userInfo?._id || userInfo?.id || userInfo?.idStudent,
                email: userInfo?.email,
                name: userInfo?.firstName || userInfo?.name,
                token: token,
                sessionId: sessionId,
              };
              
              setUser(authData);
              localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
              
              // Clean up session_id from sessionStorage
              sessionStorage.removeItem(SESSION_STORAGE_KEY);
              
              // Remove session_id from URL
              const cleanUrl = window.location.pathname;
              window.history.replaceState({}, document.title, cleanUrl);
              
              console.log('✅ SSO Login successful with verified token:', authData);
            } else {
              // Token invalid/expired
              console.error('❌ Token verification failed, token may be expired');
              setUser(null);
              localStorage.removeItem(AUTH_STORAGE_KEY);
              sessionStorage.removeItem(SESSION_STORAGE_KEY);
            }
          } else {
            console.error('❌ Invalid session or no token received', response);
          }
        } catch (error) {
          console.error('❌ Error verifying session:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkSessionCallback();
  }, []);

  const login = () => {
    // Generate random session_id
    const sessionId = generateUUID();
    
    // Save session_id to sessionStorage
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    
    // Redirect to FE login with session_id
    const loginUrl = `${process.env.DOMAIN_FE}/signin?session_id=${sessionId}`;
    window.location.href = loginUrl;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    console.log('✅ Logged out');
  };

  const isAuthenticated = !!user?.token;

  // Debug log
  useEffect(() => {
    console.log('🔐 Auth State:', { isAuthenticated, user, isLoading });
  }, [isAuthenticated, user, isLoading]);

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

