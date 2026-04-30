# Dobby Ads Drive 🗂️

A Google Drive-inspired web application where users can register, create nested folders, and upload images — built as a Full Stack Developer Assignment for Dobby Ads.

## 🌐 Live Demo

- **Frontend:** https://your-frontend.vercel.app
- **Backend:** https://your-backend.render.com

> Update these links after deployment.

---

## ✨ Features

- 🔐 User authentication (Signup, Login, Logout)
- 📁 Create nested folders (like Google Drive)
- 🖼️ Upload images inside folders
- 📦 Folder size calculated recursively across all nested folders
- 👤 User-specific access — users only see their own data
- ☁️ Images stored on Cloudinary

---

## 🛠️ Tech Stack

**Frontend:**

- React.js (Vite)

**Backend:**

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication (HTTP-only cookies)
- Cloudinary (image storage)
- Multer (file uploads)

---

## 📁 Project Structure

```
dobby-ads-drive/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── cloudinary.js
│   │   ├── controller/
│   │   │   ├── user.controller.js
│   │   │   ├── folder.controller.js
│   │   │   └── image.controller.js
│   │   ├── middleware/
│   │   │   └── middleware.js
│   │   ├── model/
│   │   │   ├── user.model.js
│   │   │   ├── folder.model.js
│   │   │   └── image.model.js
│   │   └── route/
│   │       ├── user.route.js
│   │       ├── folder.route.js
│   │       └── image.route.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    ├── package.json
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your credentials in .env

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your backend URL

# Start development server
npm run dev
```

---

## 🔑 Environment Variables

### Backend `.env`

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint       | Description         | Auth |
| ------ | -------------- | ------------------- | ---- |
| POST   | `/user/signup` | Register a new user | ❌   |
| POST   | `/user/login`  | Login               | ❌   |
| POST   | `/user/logout` | Logout              | ✅   |

### Folders

| Method | Endpoint            | Description                    | Auth |
| ------ | ------------------- | ------------------------------ | ---- |
| POST   | `/folder`           | Create a folder                | ✅   |
| GET    | `/folder?parentId=` | Get folders (root or nested)   | ✅   |
| GET    | `/folder/:id`       | Get single folder with size    | ✅   |
| DELETE | `/folder/:id`       | Delete folder and all contents | ✅   |

### Images

| Method | Endpoint           | Description              | Auth |
| ------ | ------------------ | ------------------------ | ---- |
| POST   | `/image`           | Upload image to a folder | ✅   |
| GET    | `/image?folderId=` | Get images in a folder   | ✅   |
| DELETE | `/image/:id`       | Delete an image          | ✅   |

---

## 🔐 Test Credentials

After deployment, use these to test the app:

```
Email: test@dobbyads.com
Password: test123
```

> Update these with your actual test credentials before submitting.

---

## 📦 Deployment

- **Backend** deployed on [Render](https://render.com)
- **Frontend** deployed on [Vercel](https://vercel.com)

---

## 👨‍💻 Author

Built by **Rakshand** for the Dobby Ads Full Stack Developer Assignment.
