# 🔧 Environment Variables Configuration

## Setup Instructions

Tạo các file sau trong thư mục root của plugin:

### `.env.qa` (QA/Staging Environment)
```env
# Domain & Prefix
PREFIX=/wordpress
DOMAIN_FE=https://checkmate-user.vercel.app

# API Configuration
API_HOST=ai.microgem.io.vn
API_CONTACT_CREATE=/api/fe/contact/create-new

# Portal API
PORTAL_API_URL=https://apiems.microgem.io.vn

# Payment API
PAYMENT_API_URL=https://payment.microgem.io.vn
PAYMENT_API_KEY=ccbe2d130918423c92cc30f7e5919c5e
PAYMENT_SECRET_KEY=3a6e86fdfe76cb6bf59bd713bf845f8851a1bd88de42d2553a6321952650b267
PAYMENT_METHOD_ID=09677f3c-c97e-44a8-a3d1-679ac691b0a9
```

### `.env.prod` (Production Environment)
```env
# Domain & Prefix
PREFIX=
DOMAIN_FE=https://your-production-domain.com

# API Configuration
API_HOST=ai.microgem.io.vn
API_CONTACT_CREATE=/api/fe/contact/create-new

# Portal API
PORTAL_API_URL=https://apiems.microgem.io.vn

# Payment API (Production credentials)
PAYMENT_API_URL=https://payment.microgem.io.vn
PAYMENT_API_KEY=your_production_api_key
PAYMENT_SECRET_KEY=your_production_secret_key
PAYMENT_METHOD_ID=your_production_payment_method_id
```

### `.env.local` (Local Development)
```env
# Domain & Prefix
PREFIX=/wordpress
DOMAIN_FE=http://localhost:3000

# API Configuration
API_HOST=ai.microgem.io.vn
API_CONTACT_CREATE=/api/fe/contact/create-new

# Portal API
PORTAL_API_URL=https://apiems.microgem.io.vn

# Payment API
PAYMENT_API_URL=https://payment.microgem.io.vn
PAYMENT_API_KEY=ccbe2d130918423c92cc30f7e5919c5e
PAYMENT_SECRET_KEY=3a6e86fdfe76cb6bf59bd713bf845f8851a1bd88de42d2553a6321952650b267
PAYMENT_METHOD_ID=09677f3c-c97e-44a8-a3d1-679ac691b0a9
```

## Variable Descriptions

### Domain Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `PREFIX` | WordPress subfolder path | `/wordpress` (local), `` (production) |
| `DOMAIN_FE` | Frontend React App URL | `https://checkmate-user.vercel.app` |

### API Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `API_HOST` | Main Laravel Backend | `ai.microgem.io.vn` |
| `API_CONTACT_CREATE` | Contact form endpoint | `/api/fe/contact/create-new` |

### Portal API (Order Management & Student Info)

| Variable | Description | Example | Purpose |
|----------|-------------|---------|---------|
| `PORTAL_API_URL` | Portal API base URL | `https://apiems.microgem.io.vn` | Package, Order, Student APIs |

**Portal API Endpoints:**
- `/portal/student/info` - 🍪 **Verify token from cookie**
- `/portal/package/:id` - Get package details
- `/portal/order/checkDiscountCode` - Check discount code
- `/portal/order/create` - Create new order

### Payment API

| Variable | Description | Environment | Required |
|----------|-------------|-------------|----------|
| `PAYMENT_API_URL` | Payment service URL | All | ✅ |
| `PAYMENT_API_KEY` | Payment API Key | **Different per env** | ✅ |
| `PAYMENT_SECRET_KEY` | Payment Secret Key | **Different per env** | ✅ |
| `PAYMENT_METHOD_ID` | Payment Method ID | **Different per env** | ✅ |

⚠️ **Important**: Payment credentials MUST be different for each environment!

## Build Commands with Environment

```bash
# QA/Staging Build
npm run qa         # Uses .env.qa

# Production Build
npm run prod       # Uses .env.prod

# Development Build (Watch mode)
npm run build      # Uses .env.qa

# Local Development
npm run dev        # Uses .env.local
```

## Security Notes

🔒 **NEVER commit .env files to git!**
- `.env.qa` - Staging credentials
- `.env.prod` - Production credentials (HIGHLY SENSITIVE)
- `.env.local` - Local dev settings

These files are already in `.gitignore`.

## Verifying Environment Variables

After setting up, verify in browser console:

```javascript
console.log('Environment Check:', {
  PREFIX: process.env.PREFIX,
  DOMAIN_FE: process.env.DOMAIN_FE,
  API_HOST: process.env.API_HOST,
  PAYMENT_API_KEY: process.env.PAYMENT_API_KEY?.substring(0, 10) + '...',
});
```

## Common Issues

### Issue 1: Environment variables not loading

**Solution:**
```bash
# Make sure you're using the correct build command
npm run qa    # NOT npm run build
```

### Issue 2: Wrong API endpoints

**Check:**
- File `.env.qa` exists in root directory
- Webpack config loads dotenv correctly
- Build process completed successfully

### Issue 3: Payment API 401 Unauthorized

**Cause:** Wrong API key for environment

**Solution:**
- Verify `PAYMENT_API_KEY` matches your environment
- Contact backend team for correct credentials

