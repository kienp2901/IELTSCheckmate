# 🍪 Session Cookie Mechanism

## Tổng quan

WordPress landing page áp dụng **cơ chế session cookie** giống y hệt FE React để đảm bảo tính nhất quán và bảo mật.

## 🔄 So sánh FE React vs WordPress

### FE React (Existing)

```javascript
// Login
document.cookie = `userToken=${token}; path=/;` // Session cookie (no expiry)
localStorage.setItem('userData', JSON.stringify(user));

// Check auth (Middleware)
const userToken = getCookie('userToken');
if (!userToken) {
  redirect('/signin'); // Must login
}

// Tắt browser → Cookie mất → Must login lại ✅
```

### WordPress Landing (Updated ✨)

```javascript
// Login
sessionStorage.setItem('ielts_checkmate_session_token', token); // Like cookie
localStorage.setItem('ielts_checkmate_auth', JSON.stringify(authData)); // Backup

// Check auth (Page load)
const sessionToken = sessionStorage.getItem('ielts_checkmate_session_token');
if (!sessionToken) {
  clearAuth();
  showLoginButtons(); // Must login
  return;
}

// Tắt browser → sessionStorage mất → Must login lại ✅
```

## 📊 Storage Strategy

### 3 Storage Keys:

| Key | Storage | Purpose | Behavior |
|-----|---------|---------|----------|
| `ielts_checkmate_session_token` | sessionStorage | **PRIMARY** - Token check (like cookie) | ❌ Mất khi tắt browser |
| `ielts_checkmate_auth` | localStorage | Backup - User info, sessionId | ✅ Persistent |
| `ielts_checkmate_session_id` | sessionStorage | Temporary - SSO login flow | ❌ Mất sau login |

### Why 2 Storages?

**sessionStorage (PRIMARY):**
- Behavior like session cookie
- Mất khi tắt browser hoặc close tab
- Used for auth gate check

**localStorage (BACKUP):**
- Persistent across browser restarts
- Store sessionId để re-verify
- Store user info
- **NOT used for auth check directly**

## 🎯 Complete Flow

### Scenario 1: Login lần đầu

```
User login → Callback về WP
  ↓
Verify session → Get token ✅
  ↓
Verify token → Valid ✅
  ↓
Save data:
  ├─► sessionStorage['session_token'] = token
  └─► localStorage['auth'] = { token, sessionId, email, ... }
  ↓
Show "Vào học" button ✅
```

### Scenario 2: Reload page (browser còn mở)

```
Page load
  ↓
Check sessionStorage['session_token']
  ├─► Exists ✅ → Proceed
  │   ↓
  │   Get localStorage['auth']
  │   ↓
  │   Verify session (if has sessionId)
  │   ↓
  │   Verify token
  │   ↓
  │   Authenticated ✅
  │
  └─► NOT Exists ❌ → STOP
      ↓
      Clear all auth
      ↓
      Show "Đăng nhập" button
```

### Scenario 3: Tắt browser → Mở lại (CRITICAL! 🔥)

```
Tắt Safari/Chrome/Firefox
  ↓
sessionStorage cleared by browser
  ↓
Mở lại WordPress
  ↓
Page load
  ↓
Check sessionStorage['session_token']
  ↓
❌ NOT Found (đã bị clear)
  ↓
console.log('❌ No session token found (browser was closed)')
  ↓
Clear all:
  ├─► localStorage.removeItem('auth')
  ├─► sessionStorage.removeItem('session_id')
  └─► sessionStorage.removeItem('session_token')
  ↓
setUser(null)
  ↓
Show "Đăng nhập" button ✅
  ↓
User MUST login lại
```

### Scenario 4: Tab mới (cùng browser window)

```
User đã login ở tab 1
  ↓
Mở tab 2 (Ctrl + T)
  ↓
sessionStorage['session_token'] ✅ Still exists (shared in same window)
  ↓
Tab 2 authenticated ✅
```

## 🧪 Test Cases

### Test 1: Login persistence trong session

```bash
1. Login vào WordPress
   → ✅ Button "Vào học" hiện
   
2. Reload page (F5)
   → ✅ Vẫn login (sessionStorage còn)
   
3. Mở tab mới
   → ✅ Vẫn login (sessionStorage shared)
```

### Test 2: Session ends khi tắt browser

```bash
1. Login vào WordPress
   → ✅ Button "Vào học" hiện
   
2. Tắt Safari/Chrome hoàn toàn
   
3. Mở lại browser → vào WordPress
   → Console logs:
   🔍 Checking session token: none
   ❌ No session token found (browser was closed)
   → ❌ Button "Đăng nhập" hiện (must login again)
```

### Test 3: Verify trong Console

```javascript
// Check session token (PRIMARY)
sessionStorage.getItem('ielts_checkmate_session_token');
// → Should have token if logged in

// Check backup data
localStorage.getItem('ielts_checkmate_auth');
// → Has data but NOT used directly for auth

// Test behavior: Clear session token manually
sessionStorage.removeItem('ielts_checkmate_session_token');
location.reload();
// → Should force logout even if localStorage has data
```

## 💡 Key Differences from Before

### Before (Old Behavior):

```
Login → Save to localStorage
  ↓
Tắt browser → localStorage vẫn còn
  ↓
Mở lại → Read localStorage → Auto login ✅
  ↓
User vẫn logged in (không cần login lại)
```

**Problem:** Persistent login, not secure on shared computers

### After (New Behavior):

```
Login → Save to sessionStorage + localStorage
  ↓
Tắt browser → sessionStorage mất
  ↓
Mở lại → Check sessionStorage → Không có ❌
  ↓
Clear all → Must login lại ✅
```

**Benefit:** Session-based auth, more secure

## 🎯 Why Match FE Behavior?

### 1. Consistency

```
User experience on FE:
  - Login → Tắt browser → Must login lại

User experience on WordPress:
  - Login → Tắt browser → Must login lại ✅

→ Same behavior, no confusion!
```

### 2. Security

```
Shared computer scenario:
  - User login → Use site → Tắt browser
  - Next user opens browser
  - Session cleared ✅ → Previous user logged out
```

### 3. Privacy

```
No persistent login = Better privacy
Browser close = Session end
Fresh start mỗi lần mở browser
```

## 📝 Implementation Summary

### Storage Roles:

**sessionStorage (Session Cookie):**
- ✅ PRIMARY auth check
- ❌ Mất khi tắt browser
- Used by: Auth gate

**localStorage (Backup):**
- ❌ NOT for auth check directly
- ✅ Persistent
- Used by: Store sessionId, user info để re-verify

### Auth Flow Priority:

```
1. Check sessionStorage first
   ↓ NO → Force login
   ↓ YES → Continue

2. Check localStorage for details
   ↓ NO → Clear all
   ↓ YES → Continue

3. Verify session (with sessionId)
   ↓ FAIL → Clear all
   ↓ SUCCESS → Continue

4. Verify token (with token)
   ↓ FAIL → Clear all
   ↓ SUCCESS → Authenticated ✅
```

## 🔥 Critical Point

**SessionStorage is the GATE:**

```typescript
if (!sessionStorage.getItem('session_token')) {
  // NO PASS - must login
  return;
}

// Has token → Can proceed with verification
```

Ngay cả khi localStorage còn đầy đủ data, nếu sessionStorage không có token → **MUST LOGIN LẠI**.

Exactly như FE React! 🎯

---

**Last Updated:** 2025-11-02  
**Version:** 2.0 - Session Cookie Mechanism

