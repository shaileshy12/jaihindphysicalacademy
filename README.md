````md
# Jai Hind Physical Academy

Production-ready MERN web platform for Jai Hind Physical Academy featuring secure admin management, enquiry handling, responsive UI, media gallery management, and Cloudinary integration.

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- i18next

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cookie-based Authentication
- Multer
- Cloudinary
- Zod Validation
- Helmet
- Rate Limiting

---

# Features

## Public Website
- Fully responsive design
- Multi-language support
- Course information pages
- Gallery with images and videos
- Contact & enquiry forms
- Mobile-friendly UI
- Optimized performance

## Admin Dashboard
- Secure admin authentication
- Cookie-based session management
- Protected admin routes
- Enquiry management system
- Pending/Solved/Archived enquiry handling
- Gallery upload & delete system
- Video & image uploads
- Website settings management
- Responsive admin interface

## Media Upload System
- Cloudinary integration
- Image uploads
- Video uploads
- Upload progress indicator
- Media preview support
- Optimized media handling

## 🛡 Security Features
- Helmet security middleware
- MongoDB sanitization
- Zod request validation
- Rate limiting
- Secure HTTP-only cookies
- Protected routes
- File type validation
- Secure environment variables

---

# 📁 Project Structure

```bash
Frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── layouts/
│   ├── routes/
│   ├── context/
│   ├── locales/
│   └── assets/
│
└── public/

Backend/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validations/
│   ├── utils/
│   └── config/
│
└── uploads/
```

---

# Environment Variables

## Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.com
```

## Backend (.env)

```env
PORT=4000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

CLIENT_URL=https://your-frontend-domain.com

CLOUDINARY_CLOUD_NAME=XXXX
CLOUDINARY_API_KEY=XXXX
CLOUDINARY_API_SECRET=XXXX
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Jai-Hind-Physical-Academy.git
```

---

# Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:4000
```

---

# Deployment

## Recommended Deployment Stack

| Service | Platform |
|---|---|
| Frontend | Cloudflare Pages |
| Backend | Railway |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |
| Domain | Cloudflare |

---

# Production Configuration

## CORS

```js
origin: [
  "https://jaihindphysicalacademy.com",
  "https://www.jaihindphysicalacademy.com",
]
```

## Secure Cookies

```js
res.cookie("adminToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
```

---

# Gallery System

The application supports:

- Image uploads
- Video uploads
- Cloudinary storage
- Upload progress tracking
- Admin gallery management

---

# Responsive Design

The platform is optimized for:

- Mobile devices
- Tablets
- Laptops
- Large desktop screens

---

# Future Improvements

- Skeleton loading system
- Pagination
- Audit logging
- Email notifications
- Redis caching
- Advanced analytics dashboard
- CI/CD automation
- Direct Cloudinary uploads

---

# Developer

Developed by Shailesh Yadav.

---

# License

This project is intended for Jai Hind Physical Academy.

All rights reserved.
````
