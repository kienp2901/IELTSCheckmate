# IELTS Checkmate Dashboard

> WordPress Plugin - IELTS Course Management & Landing Page

## 📋 Tổng quan

IELTS Checkmate Dashboard là một plugin WordPress hiện đại được xây dựng với React + TypeScript, cung cấp giao diện quản lý khóa học IELTS và trang landing page chuyên nghiệp cho trung tâm đào tạo IELTS.

## ✨ Tính năng chính

### 🎯 Pages
- **Landing Page (Trang chủ)**: Giới thiệu khóa học IELTS với các section:
  - Giới thiệu IELTS Checkmate
  - Kinh nghiệm học IELTS
  - Video học IELTS
  - Hướng dẫn học IELTS
  - Testimonials (Đánh giá từ học viên)
  
- **Contact Page**: Trang xác nhận đã gửi thông tin liên hệ
- **Register Page**: Form đăng ký khóa học với:
  - Thông tin đơn hàng
  - Chọn ưu đãi (40% - 50%)
  - Quà tặng kèm theo
  - Validation form (SĐT, Email)
  
- **Thank You Page**: Trang cảm ơn sau khi đăng ký

### 🛠️ Components
- **Rich Text Editor**: Tích hợp TipTap editor với đầy đủ tính năng
- **Calendar**: Quản lý lịch học và workshop
- **Workshop Management**: Quản lý các buổi workshop
- **Chatbox**: Hỗ trợ chat trực tuyến
- **Responsive Design**: Tối ưu cho mọi thiết bị (Desktop, Tablet, Mobile)

### 🎨 UI/UX
- Material-UI (MUI) v6
- Framer Motion cho animations
- Custom theme với gradient colors
- Icons: Lucide React, MUI Icons
- Responsive grid system

## 🚀 Công nghệ sử dụng

### Frontend
- **React** 18.2.0
- **TypeScript** 5.7.2
- **Material-UI (MUI)** v6.3.0
- **React Router** v7.1.1
- **TipTap** v2.11.0 (Rich Text Editor)
- **FullCalendar** v6.1.15
- **Framer Motion** v12.4.7
- **Notistack** v3.0.1 (Notifications)

### Build Tools
- **Webpack** 5.97.1
- **Vite** (Alternative build tool)
- **Babel** 7.26.0
- **TypeScript Compiler**
- **Sass/SCSS** Support

### API Integration
- Axios v1.7.9
- WordPress REST API
- Custom API endpoints

## 📦 Cài đặt

### Yêu cầu hệ thống
- WordPress 5.0+
- PHP 7.4+
- Node.js 16+ & npm/yarn

### Các bước cài đặt

1. **Upload plugin vào WordPress**
```bash
# Copy plugin vào thư mục plugins
cp -r ielts_checkmate_dashboard /path/to/wordpress/wp-content/plugins/
```

2. **Cài đặt dependencies**
```bash
cd wp-content/plugins/ielts_checkmate_dashboard
npm install
# hoặc
yarn install
```

3. **Build production**
```bash
# Build cho môi trường QA
npm run qa

# Build cho môi trường Production
npm run prod

# Build cho Development (watch mode)
npm run build
```

4. **Kích hoạt plugin trong WordPress Admin**
- Vào `Plugins` → Tìm `Ielts checkmate dashboard` → Click `Activate`

5. **Plugin sẽ tự động tạo 4 pages**:
   - `/ielts-checkmate-dashboard` - Trang chủ
   - `/contact` - Trang liên hệ
   - `/register` - Trang đăng ký
   - `/thankyou` - Trang cảm ơn

## ⚙️ Cấu hình

### Environment Variables

Tạo file `.env.qa` hoặc `.env.prod` với các biến sau:

```env
PREFIX=/wordpress  # Thay đổi theo cấu trúc URL của bạn
API_URL=https://your-api.com
```

### Build Scripts

```json
{
  "dev": "vite",                    // Dev server với Vite
  "build": "webpack --watch",       // Development build (watch mode)
  "qa": "webpack --mode production", // QA build
  "prod": "webpack --mode production", // Production build
  "watch": "vite build --watch"     // Vite watch mode
}
```

## 📁 Cấu trúc thư mục

```
ielts_checkmate_dashboard/
├── src/
│   ├── @types/              # TypeScript type definitions
│   ├── api/                 # API integration
│   │   ├── api-core.ts
│   │   ├── workshop-api.ts
│   │   └── wp-api.ts
│   ├── assets/              # Images, icons
│   ├── components/          # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TextEditor.tsx
│   │   └── ...
│   ├── contexts/            # React Context providers
│   │   ├── UserContext.tsx
│   │   ├── AlertContext.tsx
│   │   ├── DialogContext.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── Contact/
│   │   ├── Register/
│   │   └── Thankyou/
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   └── theme.tsx            # MUI theme configuration
├── dist/                    # Build output
├── ielts_checkmate_dashboard.php  # Main plugin file
├── index.php                # Template file
├── webpack.config.js        # Webpack configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## 🔧 Development

### Development Mode

```bash
# Webpack watch mode
npm run build

# Hoặc sử dụng Vite dev server
npm run dev
```

### Code Structure

#### Context Providers
- **UserContext**: Quản lý thông tin user WordPress
- **AlertContext**: Hiển thị notifications
- **DialogContext**: Quản lý dialogs/modals
- **AvatarContext**: Quản lý avatar user
- **ScrollContext**: Quản lý scroll behavior

#### API Integration
- **wp-api.ts**: WordPress REST API endpoints
- **workshop-api.ts**: Workshop management APIs
- **api-core.ts**: Core API configuration

#### Routing
```typescript
/                    → Landing Page
/contact            → Contact Form
/register           → Registration Form
/thankyou           → Thank You Page
```

## 🎨 Customization

### Theme Colors
Chỉnh sửa trong `src/theme.tsx`:
```typescript
palette: {
  primary: { main: '#0E9F97' },
  secondary: { main: '#63D0BD' },
  // ...
}
```

### Components
Tất cả components đều có thể tùy chỉnh trong `src/components/`

### Styling
- Sử dụng MUI `sx` prop
- SCSS modules: `src/main.scss`
- Component-specific SCSS

## 🔌 WordPress Integration

### Plugin Activation
Khi activate, plugin sẽ:
1. Tạo 4 pages mới
2. Lưu page IDs vào WordPress options
3. Set custom template cho các pages

### Plugin Deactivation
Khi deactivate, plugin sẽ:
1. Xóa tất cả pages đã tạo
2. Clean up options

### Template Override
Plugin sử dụng custom template (`index.php`) để render React app thay vì template WordPress mặc định.

## 📱 Responsive Breakpoints

```typescript
xs: 0px      // Mobile
sm: 600px    // Tablet
md: 900px    // Small Desktop
lg: 1200px   // Desktop
xl: 1536px   // Large Desktop
```

## 🐛 Debugging

Uncomment debug lines trong `ielts_checkmate_dashboard.php`:
```php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
```

## 📝 License

Copyright © 2024 - IELTS Checkmate

## 👨‍💻 Author

**kien**
- Website: https://freetuts.net

## 🆘 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng liên hệ support team.

---

**Version:** 1.4
**Last Updated:** 2024
