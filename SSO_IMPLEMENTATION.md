# 🔐 SSO Login Implementation

## Tổng quan

Hệ thống đăng nhập SSO (Single Sign-On) cho phép user đăng nhập qua React FE và tự động đồng bộ với WordPress landing page.

## 📋 Flow hoạt động

### 1. User chưa đăng nhập

```
┌─────────────┐
│  User click │
│ "Đăng nhập" │
└──────┬──────┘
       │
       ▼
┌──────────────────────────┐
│ 1. Generate session_id   │
│    (UUID v4)             │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ 2. Save to sessionStorage│
└──────┬───────────────────┘
       │
       ▼
┌────────────────────────────────────────┐
│ 3. Redirect to FE login:               │
│    ${DOMAIN_FE}/login?session_id=xxx   │
└────────────────────────────────────────┘
```

### 2. User login trên FE

```
┌─────────────────────────┐
│ User login trên FE      │
│ (Email/Password, Google)│
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────┐
│ FE save token to         │
│ session_id via API       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│ FE redirect về WordPress:            │
│ /wordpress/?session_id=xxx           │
└──────────────────────────────────────┘
```

### 3. WordPress verify session

```
┌────────────────────────┐
│ WordPress nhận callback│
│ với session_id         │
└──────┬─────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│ Call API:                            │
│ GET /api/sso/session/{session_id}    │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Response:                │
│ {                        │
│   status: true,          │
│   data: {                │
│     token: "xxx",        │
│     user: { ... }        │
│   }                      │
│ }                        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Save to localStorage:    │
│ - token                  │
│ - user info              │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Update UI:               │
│ - Hide Đăng ký/Đăng nhập │
│ - Show "Vào học" button  │
└──────────────────────────┘
```

## 📁 Files thay đổi

### 1. `src/contexts/AuthContext.tsx` (NEW)
**Chức năng**: Quản lý auth state và SSO flow

**API**:
```typescript
const { 
  isAuthenticated,  // boolean
  user,            // IAuthUser | null
  login,           // () => void
  logout,          // () => void
  isLoading        // boolean
} = useAuth();
```

**Storage**:
- `localStorage['ielts_checkmate_auth']`: Lưu token và user info
- `sessionStorage['ielts_checkmate_session_id']`: Lưu session_id tạm

### 2. `src/api/api.ts` (UPDATED)
**Thêm SSO API**:
```typescript
api.sso.verifySession(sessionId: string)
```

### 3. `src/components/Header.tsx` (UPDATED)
**Thay đổi**:
- Import `useAuth`
- Button "Đăng nhập" → `onClick={login}`
- Khi `isAuthenticated = true`:
  - Ẩn "Đăng ký" + "Đăng nhập"
  - Hiện "Vào học" button

### 4. `src/pages/components/IELTSCheckmateIntro.tsx` (UPDATED)
**Thay đổi**:
- Button "Bắt đầu học" dynamic:
  - Chưa login → trigger `login()`
  - Đã login → redirect to dashboard

### 5. `src/main.tsx` (UPDATED)
**Wrap App với AuthProvider**:
```tsx
<AuthProvider>
  <UserProvider>
    <App />
  </UserProvider>
</AuthProvider>
```

## 🔧 Environment Variables

Cần set trong `.env.qa` hoặc `.env.prod`:

```env
# FE Domain
DOMAIN_FE=https://checkmate-user.vercel.app

# API Host
API_HOST=ai.microgem.io.vn
```

## 🎯 API Requirements

Backend Laravel cần implement endpoint:

```
GET https://ai.microgem.io.vn/api/sso/session/{session_id}
```

**Response format**:
```json
{
  "status": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 123,
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

## 🧪 Testing

### Test Flow:
1. Mở WordPress landing page
2. Click "Đăng nhập" → redirect to FE with session_id
3. Login trên FE
4. FE redirect về → WordPress auto verify và login
5. Check UI: "Vào học" button xuất hiện

### Debug:
```javascript
// Check auth state
console.log(localStorage.getItem('ielts_checkmate_auth'));

// Check session_id
console.log(sessionStorage.getItem('ielts_checkmate_session_id'));
```

## 🚀 Features

✅ Auto-generate UUID v4 session_id  
✅ Store session_id in sessionStorage  
✅ Redirect to FE login with session_id  
✅ Auto verify session on callback  
✅ Save token to localStorage  
✅ Dynamic UI based on auth state  
✅ Support both mobile and desktop  
✅ Clean URL after authentication  

## 🔒 Security Notes

1. Session_id chỉ dùng 1 lần (one-time use)
2. Token được lưu trong localStorage (có thể chuyển sang httpOnly cookie nếu cần)
3. API verify session có timeout và expiry
4. Clean up session_id sau khi verify thành công

## 📝 Notes

- WordPress chỉ là landing page, không quản lý user database
- Authentication được handle hoàn toàn bởi Laravel Backend
- Token được issue từ Backend và validate bởi Backend
- WordPress chỉ store token để maintain logged-in state

