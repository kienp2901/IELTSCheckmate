# 🐛 Debug SSO Login

## Vấn đề đã fix

API response format không match với code:
- API trả về `success: true` → code đã update để check cả `success` và `status`
- API trả về `user_info` → code đã update để check cả `user_info` và `user`
- API trả về `firstName` → code đã update để map đúng fields

## 🔍 Debug Steps

### 1. Mở Console và kiểm tra logs

Sau khi redirect về với `?session_id=xxx`, bạn sẽ thấy các logs:

```
🔍 Checking stored auth: null
🔄 Verifying session: 99e8fd1c-b865-486f-9f35-fadbbda93abd
📦 API Response: { success: true, data: {...} }
✅ SSO Login successful { id: "c579f5fc...", email: "kienp2901@gmail.com", ... }
✅ User restored from localStorage: {...}
🔐 Auth State: { isAuthenticated: true, user: {...}, isLoading: false }
🎯 Header - Auth state: { isAuthenticated: true, user: {...} }
```

### 2. Check localStorage

```javascript
// Mở console và chạy:
localStorage.getItem('ielts_checkmate_auth')

// Kết quả mong đợi:
{
  "id": "c579f5fc-6378-4df2-972e-8e8ba434140a",
  "email": "kienp2901@gmail.com",
  "name": "ABC",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Check React DevTools

1. Mở React DevTools
2. Tìm `AuthContext.Provider`
3. Check value: `{ isAuthenticated: true, user: {...} }`

### 4. Force refresh

Nếu button vẫn chưa hiện, thử:

```javascript
// Clear cache và reload
localStorage.clear();
sessionStorage.clear();
location.reload();

// Sau đó login lại
```

## 🎯 Test Flow Đầy Đủ

### Test 1: Fresh Login

```bash
# 1. Clear storage
localStorage.clear();
sessionStorage.clear();

# 2. Click "Đăng nhập"
# → Redirect to: ${DOMAIN_FE}/login?session_id=xxx

# 3. Login trên FE
# → Redirect to: /wordpress/?session_id=xxx&login=success

# 4. Check console logs:
✅ 🔄 Verifying session: xxx
✅ 📦 API Response: {...}
✅ ✅ SSO Login successful
✅ 🔐 Auth State: { isAuthenticated: true }
✅ 🎯 Header - Auth state: { isAuthenticated: true }

# 5. Check UI:
✅ Button "Đăng ký" và "Đăng nhập" → HIDDEN
✅ Button "Vào học" → VISIBLE
```

### Test 2: Persistent Login

```bash
# 1. Đã login rồi, reload page
location.reload();

# 2. Check console logs:
✅ 🔍 Checking stored auth: {"id":"...","email":"...","token":"..."}
✅ ✅ User restored from localStorage
✅ 🔐 Auth State: { isAuthenticated: true }

# 3. Check UI:
✅ Button "Vào học" vẫn hiện
```

## ❌ Common Issues

### Issue 1: Button không hiện sau login

**Check:**
```javascript
// Console:
const { isAuthenticated } = useAuth();
console.log(isAuthenticated); // Should be true
```

**Fix:**
- Hard refresh: `Ctrl + Shift + R`
- Clear cache
- Check console errors

### Issue 2: API CORS error

**Symptom:**
```
Access to XMLHttpRequest at 'https://ai.microgem.io.vn/api/sso/session/xxx'
from origin 'http://localhost:8888' has been blocked by CORS policy
```

**Fix:**
Backend cần add CORS headers:
```php
Access-Control-Allow-Origin: http://localhost:8888
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Accept
```

### Issue 3: Token không được save

**Check:**
```javascript
localStorage.getItem('ielts_checkmate_auth')
// null hoặc undefined
```

**Fix:**
- Check API response có `token` field không
- Check console có error không
- Verify API response format match với code

## 🧪 Manual Test Script

Copy và paste vào console:

```javascript
// Test 1: Check current auth state
console.log('=== AUTH STATE ===');
console.log('localStorage:', localStorage.getItem('ielts_checkmate_auth'));
console.log('sessionStorage:', sessionStorage.getItem('ielts_checkmate_session_id'));

// Test 2: Simulate API response
const mockResponse = {
  success: true,
  data: {
    token: "test_token_123",
    user_info: {
      _id: "123",
      email: "test@example.com",
      firstName: "Test User"
    }
  }
};

// Test 3: Save to localStorage
const authData = {
  id: mockResponse.data.user_info._id,
  email: mockResponse.data.user_info.email,
  name: mockResponse.data.user_info.firstName,
  token: mockResponse.data.token
};
localStorage.setItem('ielts_checkmate_auth', JSON.stringify(authData));
console.log('✅ Mock auth data saved');

// Test 4: Reload to check
location.reload();
```

## 📝 Checklist

Sau khi fix, check tất cả:

- [ ] Console không có error
- [ ] API call thành công (status 200)
- [ ] localStorage có token
- [ ] isAuthenticated = true
- [ ] Button "Vào học" hiển thị
- [ ] Button "Đăng ký" + "Đăng nhập" ẩn đi
- [ ] Reload page vẫn giữ trạng thái login

## 🚀 Next Steps

Nếu tất cả đã OK:

1. Build production: `npm run prod`
2. Test trên production domain
3. Verify với real users
4. Monitor logs trong production

## 📞 Need Help?

Nếu vẫn có vấn đề, gửi cho tôi:

1. Screenshot console logs
2. Screenshot React DevTools (AuthContext)
3. Screenshot Network tab (API call)
4. localStorage content

