# AiThor Frontend

فرونت إند لتطبيق AiThor - نظام إدارة الشركات والمشاريع بالذكاء الاصطناعي

## المميزات

- 🔐 تسجيل الدخول والتسجيل
- 🏢 إدارة بيانات الشركة
- 📋 إدارة المشاريع والمنتجات
- 💬 الدردشة مع الذكاء الاصطناعي
- 📊 عرض طلبات العملاء
- 🔑 إدارة مفتاح API
- 🎨 واجهة مستخدم عربية متجاوبة

## التقنيات المستخدمة

- React 18
- React Router DOM v6
- Axios
- CSS3
- Context API

## التثبيت والتشغيل

1. تثبيت التبعيات:
```bash
npm install
```

2. إنشاء ملف `.env` في مجلد الفرونت إند:
```
REACT_APP_API_URL=https://aithor2-production.up.railway.app/api
```

3. تشغيل التطبيق:
```bash
npm start
```

سيتم فتح التطبيق في المتصفح على العنوان: http://localhost:3000

## حل المشاكل الشائعة

### 1. تحذيرات React Router
تم حل هذه التحذيرات بإضافة Future Flags في App.js:
```javascript
<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
```

### 2. خطأ الاتصال بالباك إند
- تأكد من أن رابط API في ملف `.env` صحيح
- الباك إند يعمل على: https://aithor2-production.up.railway.app/api
- يمكن اختبار الاتصال من صفحة `/test`

### 3. مشاكل CORS
تم إعداد الباك إند لدعم CORS من جميع المصادر.

## البنية

```
src/
├── components/          # المكونات المشتركة
│   └── ProtectedRoute.js
├── pages/              # صفحات التطبيق
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── CompanySetup.js
│   ├── ProjectManagement.js
│   ├── ChatInterface.js
│   └── TestPage.js
├── services/           # خدمات API
│   └── api.js
├── context/           # Context API
│   └── AuthContext.js
├── App.js             # المكون الرئيسي
├── index.js           # نقطة البداية
└── index.css          # الستايل العام
```

## الصفحات

- `/login` - تسجيل الدخول
- `/register` - إنشاء حساب جديد
- `/dashboard` - لوحة التحكم الرئيسية
- `/company-setup` - إعداد بيانات الشركة
- `/test` - اختبار الاتصال بالباك إند

## API Endpoints

التطبيق يتصل مع الباك إند على العنوان: https://aithor2-production.up.railway.app/api

### المصادقة
- `POST /auth/login` - تسجيل الدخول
- `POST /auth/register` - التسجيل

### الشركة
- `GET /company` - الحصول على بيانات الشركة
- `POST /company` - إنشاء/تحديث الشركة
- `GET /company/requests` - الحصول على طلبات العملاء
- `DELETE /company/requests/:index` - حذف طلب
- `POST /company/external-request` - إرسال طلب خارجي

### المشاريع
- `GET /projects` - الحصول على المشاريع
- `POST /projects` - إنشاء مشروع جديد
- `PUT /projects/:id` - تحديث مشروع
- `DELETE /projects/:id` - حذف مشروع

### الدردشة
- `POST /chat` - إرسال رسالة للذكاء الاصطناعي
- `GET /chat/:companyId` - جلب تاريخ المحادثة

## التصميم

- تصميم متجاوب يعمل على جميع الأجهزة
- دعم اللغة العربية مع اتجاه RTL
- ألوان متدرجة حديثة
- خط Cairo العربي
- واجهة مستخدم سهلة الاستخدام

## اختبار التطبيق

1. افتح المتصفح على: http://localhost:3000
2. اذهب إلى صفحة `/test` لاختبار الاتصال
3. أنشئ حساب جديد من صفحة `/register`
4. أكمل إعداد الشركة
5. جرب جميع المميزات المتوفرة

## الدعم

إذا واجهت أي مشاكل:
1. تأكد من أن الباك إند يعمل على Railway
2. تحقق من ملف `.env`
3. استخدم صفحة `/test` لاختبار الاتصال
4. تحقق من console المتصفح للأخطاء
