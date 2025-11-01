# 💳 Payment System Implementation

## Tổng quan

Hệ thống thanh toán tích hợp với Payment Gateway của MicroGEM, hỗ trợ:
- ✅ QR Code thanh toán (VietQR)
- ✅ Chuyển khoản thủ công
- ✅ Polling tự động status (5 giây/lần)
- ✅ Hủy đơn hàng
- ✅ Multiple environments (QA/Production)

## 📋 Flow hoạt động

### 1. User tạo đơn hàng

```
┌─────────────────────┐
│ RegisterForm.tsx    │
│ User chọn gói       │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Call API: Create Order       │
│ POST /portal/order/create    │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Response:                    │
│ {                            │
│   payUrl: "...?transactionId"|
│ }                            │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Redirect to PaymentContent   │
│ /payment?transactionId=xxx   │
└──────────────────────────────┘
```

### 2. PaymentContent - Load data

```
┌─────────────────────────────┐
│ Get transactionId from URL  │
└──────┬──────────────────────┘
       │
       ├──► API 1: Get Transaction Info
       │    GET /payment/api/v1/transaction/{id}
       │    → Transaction data (status, amount, etc)
       │
       └──► API 2: Get Payment Details  
            POST /payment/api/v1/transaction/pay
            → QR Code, Bank info
```

### 3. Polling Status (Auto 5s)

```
┌─────────────────────────┐
│ setInterval(5000)       │
│ While status = pending  │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ GET /transaction/{id}            │
│ Check status changed?            │
└──────┬───────────────────────────┘
       │
       ├─► pending   → Continue polling
       ├─► success   → Stop polling, show success
       ├─► failed    → Stop polling, show error
       ├─► expired   → Stop polling, show expired
       └─► cancelled → Stop polling, show cancelled
```

## 📁 Files Created/Modified

### 1. `src/api/payment-api.ts` (NEW) ✅

**Purpose**: Payment API integration

**Exports**:
```typescript
paymentApi.transaction.getInfo(transactionId)
paymentApi.transaction.cancel(transactionId)
paymentApi.transaction.getPaymentDetails(transactionId)
```

**Config**:
```typescript
PAYMENT_CONFIG = {
  apiKey: process.env.PAYMENT_API_KEY,
  secretKey: process.env.PAYMENT_SECRET_KEY,
  idPaymentMethod: process.env.PAYMENT_METHOD_ID,
}
```

### 2. `src/pages/Payment/PaymentContent.tsx` (UPDATED) ✅

**Features**:
- ✅ Get transactionId from URL query
- ✅ Fetch transaction info
- ✅ Fetch payment details (QR, bank)
- ✅ Poll status every 5 seconds
- ✅ Cancel transaction
- ✅ Dynamic UI based on status
- ✅ Show success/error alerts

### 3. Environment Variables (REQUIRED)

See `ENVIRONMENT_VARIABLES.md` for full details.

## 🎯 API Endpoints

### 1. Get Transaction Info

```bash
GET https://payment.microgem.io.vn/payment/api/v1/transaction/{transactionId}
Headers:
  x-api-key: {PAYMENT_API_KEY}
```

**Response:**
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "transactionId": "5SMC0UWOOPWP",
    "orderId": "...",
    "items": [...],
    "totalAmount": 2000,
    "discountAmount": 2000,
    "status": "pending",
    "createdAt": "2025-10-28T09:17:30.581Z",
    "expiredAt": "2025-10-28T10:17:30.566Z"
  }
}
```

### 2. Get Payment Details

```bash
POST https://payment.microgem.io.vn/payment/api/v1/transaction/pay
Headers:
  x-api-key: {PAYMENT_API_KEY}
  Content-Type: application/json
Body:
{
  "idPaymentMethod": "{PAYMENT_METHOD_ID}",
  "transactionId": "{transactionId}"
}
```

**Response:**
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "typePM": "BANK",
    "amount": 2000,
    "currency": "VND",
    "description": "PAY 5SMC0UWOOPWP",
    "qrUrl": "https://img.vietqr.io/image/...",
    "config": {
      "name": "Ngân hàng TMCP Kỹ thương Việt Nam",
      "code": "TCB",
      "accountNumber": "308181",
      "accountName": "CT TNHH CN GIAO DUC MICROGEM"
    }
  }
}
```

### 3. Cancel Transaction

```bash
POST https://payment.microgem.io.vn/payment/api/v1/transaction/cancel
Headers:
  x-api-key: {PAYMENT_API_KEY}
  Content-Type: application/json
Body:
{
  "transactionId": "{transactionId}"
}
```

**Response:**
```json
{
  "code": 200,
  "message": "Success"
}
```

## 📊 Transaction Status Flow

```
pending (Đang chờ)
  │
  ├─► success (Thành công) ✅
  ├─► failed (Thất bại) ❌
  ├─► expired (Hết hạn) ⏰
  └─► cancelled (Đã hủy) 🚫
      └─► refunded (Đã hoàn tiền) 💰
```

## 🎨 UI States

### Status: Pending (Đang chờ thanh toán)
- ⚠️ Yellow chip: "Đang chờ thanh toán ⏳"
- 🔄 Polling active (every 5s)
- ✅ Show QR Code & Bank info
- ✅ Show "Hủy đơn hàng" button
- ✅ Show countdown timer

### Status: Success (Thanh toán thành công)
- ✅ Green alert: "🎉 Thanh toán thành công!"
- 🛑 Stop polling
- ❌ Hide "Hủy đơn hàng" button
- ✅ Show success message

### Status: Cancelled/Expired
- ❌ Red alert: "Đơn hàng đã hủy/hết hạn"
- 🛑 Stop polling
- ❌ Hide payment details
- ✅ Show "Tạo đơn mới" option

## 🧪 Testing

### Test Flow Complete:

1. **Tạo đơn hàng** (RegisterForm)
```
User chọn gói → Click "Thanh toán ngay"
→ Redirect to /payment?transactionId=xxx
```

2. **Trang thanh toán** (PaymentContent)
```
✅ Load transaction info
✅ Load payment details (QR, bank)
✅ Start polling (5s interval)
✅ User check "Tôi đã đọc kỹ..."
✅ Show QR Code & Bank info
```

3. **User thanh toán**
```
User quét QR → Chuyển tiền
Backend nhận webhook → Update status
Polling detect status change → Show success
```

4. **Cancel flow**
```
User click "Hủy đơn hàng"
→ Confirm dialog
→ Call cancel API
→ Refresh data
→ Show cancelled status
```

## 🔍 Debug

### Console Logs:

```javascript
// When page loads
💳 Payment API Request: GET /payment/api/v1/transaction/xxx
💳 Payment API Request: POST /payment/api/v1/transaction/pay

// Polling (every 5s while pending)
🔄 Polling transaction status...
✅ Transaction status changed: success

// When cancelling
💳 Payment API Request: POST /payment/api/v1/transaction/cancel
```

### Check Data:

```javascript
// In PaymentContent component
console.log('Transaction Data:', transactionData);
console.log('Payment Details:', paymentDetails);
console.log('Status:', transactionData?.status);
```

## ⚠️ Important Notes

1. **Environment-specific credentials**
   - QA và Production có API keys khác nhau
   - Phải set đúng trong `.env.qa` và `.env.prod`

2. **Polling optimization**
   - Chỉ poll khi status = 'pending'
   - Auto stop khi status thay đổi
   - Prevent memory leaks với cleanup

3. **Error handling**
   - Network errors → Show error alert
   - Invalid transactionId → Show warning
   - QR image error → Hide image, show manual instructions

4. **Security**
   - API key trong headers
   - Never expose secret key to client
   - Validate transactionId from URL

## 🚀 Production Checklist

- [ ] Set production credentials in `.env.prod`
- [ ] Test with real bank transfer
- [ ] Verify webhook integration
- [ ] Test status transitions
- [ ] Test cancel flow
- [ ] Monitor polling performance
- [ ] Check timezone conversions (GMT+0 → GMT+7)

## 📞 Support

Nếu có vấn đề:
1. Check console logs
2. Verify environment variables
3. Check Network tab (API calls)
4. Verify backend webhook working
5. Contact backend team for API issues

