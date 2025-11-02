# 🔐 SSO Login Implementation

## Tổng quan

Hệ thống đăng nhập SSO (Single Sign-On) cho phép user đăng nhập qua React FE và tự động đồng bộ với WordPress landing page.

## 📋 Flow hoạt động (Updated với Token Verification)

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
│    ${DOMAIN_FE}/signin?session_id=xxx  │
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
│ /wordpress/?session_id=xxx&login=..  │
└──────────────────────────────────────┘
```

### 3. WordPress verify session + token (UPDATED ✨)

```
┌────────────────────────┐
│ WordPress nhận callback│
│ với session_id         │
└──────┬─────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│ STEP 1: Call SSO API                 │
│ GET /api/sso/session/{session_id}    │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Response:                │
│ {                        │
│   success: true,         │
│   data: {                │
│     token: "xxx",        │
│     user_info: { ... }   │
│   }                      │
│ }                        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│ STEP 2: Verify Token (NEW! ✨)       │
│ GET /portal/student/info             │
│ Authorization: Bearer {token}        │
└──────┬───────────────────────────────┘
       │
       ├─► Token Valid ✅
       │   ├─► Save to localStorage
       │   ├─► Update UI (show "Vào học")
       │   └─► Clean URL
       │
       └─► Token Expired/Invalid ❌
           ├─► Clear localStorage
           ├─► Clear sessionStorage
           └─► Show login buttons
```

### 4. Restore session on page load (UPDATED ✨)

```
┌────────────────────────┐
│ Page load              │
│ Check localStorage     │
└──────┬─────────────────┘
       │
       ├─► No auth → Show login buttons
       │
       └─► Has auth data
           │
           ├─► Priority 1: Has sessionId? (UPDATED! ✨)
           │   │
           │   ▼
           │   ┌──────────────────────────────────┐
           │   │ Re-verify Session                │
           │   │ GET /api/sso/session/{sessionId} │
           │   └──────┬───────────────────────────┘
           │          │
           │          ├─► Session Valid → Get fresh token
           │          │   │
           │          │   ▼
           │          │   ┌──────────────────────────────┐
           │          │   │ Verify Token                 │
           │          │   │ GET /portal/student/info     │
           │          │   └──────┬───────────────────────┘
           │          │          │
           │          │          ├─► Valid ✅ → Restore user
           │          │          └─► Invalid ❌ → Clear auth
           │          │
           │          └─► Session Invalid ❌ → Clear auth
           │
           └─► Priority 2: Only has token (no sessionId)?
               │
               ▼
               ┌──────────────────────────────────┐
               │ Verify Token                     │
               │ GET /portal/student/info         │
               └──────┬───────────────────────────┘
                      │
                      ├─► Valid ✅ → Restore user
                      └─► Invalid ❌ → Clear auth
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

**Storage (Updated ✨)**:
- `localStorage['ielts_checkmate_auth']`: Backup token và user info (persistent)
- `sessionStorage['ielts_checkmate_session_id']`: Lưu session_id tạm khi login
- `sessionStorage['ielts_checkmate_session_token']`: **PRIMARY CHECK** - Token như cookie session (mất khi tắt browser)

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

### API 1: SSO Verify Session

Backend Laravel cần implement endpoint:

```
GET https://ai.microgem.io.vn/api/sso/session/{session_id}
```

**Response format**:
```json
{
  "success": true,
  "data": {
    "session_id": "99e8fd1c-b865-486f-9f35-fadbbda93abd",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user_info": {
      "_id": "68099a9b24882d70d4591353",
      "idStudent": "c579f5fc-6378-4df2-972e-8e8ba434140a",
      "email": "kienp2901@gmail.com",
      "firstName": "ABC",
      "phone": "0394859392"
    }
  }
}
```

### API 2: Verify Token (NEW! ✨)

Portal API để verify token còn hạn:

```
GET https://apiems.microgem.io.vn/portal/student/info
Headers:
  Authorization: Bearer {token}
```

**Response format**:
```json
{
  "status": true,
  "data": {
    "_id": "68099a9b24882d70d4591353",
    "firstName": "ABC",
    "lastName": "",
    "userName": "0394859392",
    "phone": "0394859392",
    "email": "kienp2901@gmail.com",
    "avatar": "https://...",
    "idStudent": "c579f5fc-6378-4df2-972e-8e8ba434140a",
    "isPermission": true,
    "timeFinishPermission": "2025-12-18T15:01:39.000Z"
  }
}
```

**Error (Token expired/invalid)**:
```json
{
  "status": false,
  "message": "Unauthorized"
}
```
or HTTP 401

## 🧪 Testing

### Test Flow 1: Fresh Login
1. Mở WordPress landing page
2. Click "Đăng nhập" → redirect to FE with session_id
3. Login trên FE
4. FE redirect về → WordPress auto verify
5. **NEW!** Verify token với student info API
6. Check UI: "Vào học" button xuất hiện

### Test Flow 2: Token Expired
1. Có token cũ trong localStorage
2. Reload page
3. **NEW!** Auto verify token với student info API
4. Token hết hạn → API trả 401
5. Auto clear auth → Show login buttons
6. User phải login lại

### Test Flow 3: Page Reload (Valid Token)
1. User đã login (có token valid)
2. Reload page
3. **NEW!** Auto verify token
4. Token còn hạn → API success
5. Auto restore user → Show "Vào học"

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
✅ **NEW!** Verify token validity với student info API  
✅ Save token to localStorage  
✅ **NEW!** Auto-check token expiry on page load  
✅ **NEW!** Clear expired tokens automatically  
✅ Dynamic UI based on auth state  
✅ Support both mobile and desktop  
✅ Clean URL after authentication

## 🎯 Benefits of Dual Verification (Session + Token)

### Why verify both sessionId AND token?

#### 1. Verify Session (`/api/sso/session/{sessionId}`)

**Purpose:**
- ✅ Check if session còn valid (chưa bị revoke)
- ✅ Get fresh token từ session
- ✅ Backend có thể invalidate session bất cứ lúc nào

**Use Cases:**
- User logout trên device khác → Session bị revoke
- Admin ban user → Session bị clear
- Security breach → All sessions bị invalidate

#### 2. Verify Token (`/portal/student/info`)

**Purpose:**
- ✅ Check token chưa expired
- ✅ Validate JWT signature
- ✅ Ensure user permissions còn active

**Use Cases:**
- Token hết hạn (JWT expiry)
- User bị block/deactivate
- Permissions thay đổi

### Combined Benefits 🚀

1. **Double Security** 🔒
   - Session level validation
   - Token level validation
   - Prevent both session hijacking và token expiry

2. **Always Fresh Token** 🔄
   - Get new token from session mỗi lần verify
   - Auto-refresh token lifecycle
   - Prevent using stale tokens

3. **Comprehensive Checks** 📊
   - Session valid? ✅
   - Token valid? ✅
   - User permissions OK? ✅
   - ALL must pass → User authenticated

4. **Graceful Degradation** 🛡️
   - SessionId missing? → Fallback to token verification
   - Token missing? → Clear auth
   - Any verification fails? → Auto-logout  

## 🍪 Session Cookie Mechanism (NEW! ✨)

### Giống như FE React

WordPress landing page bây giờ hoạt động **giống y hệt** FE React:

**FE React:**
```
Login → Save token to:
  ├─► Cookie (session) - PRIMARY
  └─► localStorage - BACKUP

Check auth:
  └─► Cookie exists? YES → Authenticated
      Cookie missing? NO → Must login (ignore localStorage)

Tắt browser → Cookie mất → Must login lại
```

**WordPress Landing (Updated):**
```
Login → Save token to:
  ├─► sessionStorage (PRIMARY) - like session cookie
  └─► localStorage (BACKUP) - for verification data

Check auth:
  └─► sessionStorage exists? YES → Verify & authenticate
      sessionStorage missing? NO → Must login (clear localStorage)

Tắt browser → sessionStorage mất → Must login lại ✅
```

### Behavior Chi Tiết

| Scenario | sessionStorage | localStorage | Result |
|----------|----------------|--------------|---------|
| Login lần đầu | ✅ Save token | ✅ Save auth data | Authenticated |
| Reload page | ✅ Token còn | ✅ Data còn | Stay logged in |
| Tắt browser | ❌ Token mất | ✅ Data còn | Must login again |
| Mở browser mới | ❌ Token mất | ✅ Data còn | Must login again |
| New tab (same window) | ✅ Token còn | ✅ Data còn | Stay logged in |

### Code Implementation

```typescript
// On page load - Check sessionStorage FIRST
const sessionToken = sessionStorage.getItem('ielts_checkmate_session_token');

if (!sessionToken) {
  // NO session token → Browser was closed
  console.log('❌ No session token, must login again');
  clearAllAuth();
  return; // Stop here, force login
}

// Has session token → Proceed with verification
const authData = localStorage.getItem('ielts_checkmate_auth');
// ... verify session & token ...
```

### Why This is Better?

1. **Security** 🔒
   - Session ends when browser closes
   - No persistent login on public computers
   - Match FE behavior

2. **User Experience** ✨
   - Consistent with FE React app
   - Expected behavior for users
   - Privacy protection

3. **Compliance** 📋
   - Better for GDPR/privacy
   - No persistent tracking
   - Clear session boundaries

## 🔒 Security Notes

1. Session_id chỉ dùng 1 lần (one-time use)
2. Token được lưu trong **sessionStorage** (PRIMARY) - mất khi tắt browser
3. localStorage chỉ là backup để store sessionId và user info
4. API verify session có timeout và expiry
5. Clean up session_id sau khi verify thành công
6. **NEW!** SessionStorage như cookie session - auto-clear khi tắt browser

## 📝 Notes

- WordPress chỉ là landing page, không quản lý user database
- Authentication được handle hoàn toàn bởi Laravel Backend
- Token được issue từ Backend và validate bởi Backend
- WordPress chỉ store token để maintain logged-in state

