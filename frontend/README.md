Dobby Ads Drive — Frontend 🖥️
React frontend for a Google Drive-inspired app where users can register, create nested folders, and upload images.
🌐 Live Demo

Frontend: https://your-frontend.vercel.app

Update this link after deployment.

🛠️ Tech Stack

React.js (Vite)
Tailwind CSS v4
Axios
React Router DOM
React Context (auth state)

📁 Project Structure
frontend/
├── src/
│ ├── api/
│ │ └── axios.js
│ ├── context/
│ │ └── AuthContext.jsx
│ ├── components/
│ │ ├── ProtectedRoute.jsx
│ │ ├── Navbar.jsx
│ │ ├── FolderCard.jsx
│ │ ├── ImageCard.jsx
│ │ ├── CreateFolderModal.jsx
│ │ └── UploadImageModal.jsx
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ └── Dashboard.jsx
│ ├── App.jsx
│ └── main.jsx
├── .env
├── package.json
└── vite.config.js

🚀 Getting Started
Prerequisites

Node.js v18+
Backend running on http://localhost:5000

Setup
bash# Install dependencies
npm install

# Create .env file

cp .env.example .env

# Start development server

npm run dev

🔑 Environment Variables
VITE_API_URL=http://localhost:5000

After deployment, update VITE_API_URL to your backend's live URL.

📄 Pages
RoutePageAuth/signupRegister❌/loginLogin❌/dashboardMain drive page✅

✨ Features

🔐 Signup, Login, Logout
📁 Create nested folders
🖼️ Upload images inside folders
📦 Folder size shown recursively
🧭 Breadcrumb navigation
🗑️ Delete folders and images
👤 User-specific data only

👨‍💻 Author
Built by Rakshand for the Dobby Ads Full Stack Developer Assignment.
