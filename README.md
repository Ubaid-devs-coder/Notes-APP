<div align="center">

# 📝 NoteFlow — Full-Stack Notes Application

A modern, fast, and elegant full-stack note-taking platform built with **React 19**, **Vite**, **Tailwind CSS v4**, **Node.js**, **Express**, and **MongoDB**. Designed with ambient dark mode, instant photo compression, and 100% responsive fluid layouts across mobile, tablet, and desktop.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](#license)

[Live Demo](https://notes-app-nine-phi-86.vercel.app) • [Deployment Guide](#️-deployment) • [Report Issue](https://github.com/Ubaid-devs-coder/Notes-APP/issues)

</div>

---

## ✨ Features

### 🗒️ Core Note Management
- **Full CRUD Support**: Create, read, edit, and organize notes with real-time UI synchronization.
- **Pinning & Priority**: Keep your most important notes pinned to the top of your dashboard.
- **Archive System**: Safely archive completed or reference notes without cluttering your main feed.
- **Two-Stage Trash & Recovery**: Soft-delete notes into a dedicated trash view with options to restore or permanently remove with modal confirmations.
- **Real-Time Search**: Instant keyword search filtering by title and content.
- **Pagination & Filters**: Smooth multi-page navigation across Recent, All, Pinned, Archived, and Trash categories.
- **Color Coding**: Customize notes with 6 curated palette swatches for quick visual scanning.

### 🎨 Design & Aesthetic
- **Dual Theme Engine**: Seamless toggle between **Light Mode** and an ambient, frosted **Dark Mode** with radial gradients and card hover glows.
- **Theme Quick-Toggle**: Instant one-click theme switcher in the top navigation bar, profile dropdown, and settings view.
- **100% Mobile Responsive**:
  - Floating bottom navigation dock on mobile screens.
  - Adaptive modals with keyboard-safe viewport limits.
  - Fluid search bar that prevents header clipping on small screens (< 400px).
  - Responsive cards with generous touch targets.

### ⚡ Ultra-Fast Photo Upload (Client-Side Compression)
- Client-side center-cropping to a perfect 1:1 aspect ratio.
- High-efficiency HTML5 Canvas compression downscaling to 384×384px.
- Reduces raw 5–15 MB phone camera images to **25–45 KB** (~99.6% reduction) in **under 100 milliseconds**.

### 🔒 Security & Authentication
- Secure **JWT (JSON Web Tokens)** authentication.
- Password hashing with **bcrypt**.
- Dual transport mechanism: HTTP-Only secure cookies + `Authorization: Bearer` header backup for complete cross-browser and cross-domain reliability.
- Protected client-side routes and API endpoints.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Security**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken), [bcrypt](https://github.com/kelektiv/node.bcrypt.js), [cookie-parser](https://github.com/expressjs/cookie-parser), [cors](https://github.com/expressjs/cors)

### Infrastructure & Deployment
- **All-in-One Deployment**: [Vercel](https://vercel.com/) (Frontend static build + Serverless Function API via `api/index.js`)
- **Alternative Backend**: [Render](https://render.com/) Web Service

---

## 📁 Repository Structure

```
Notes-APP/
├── api/
│   └── index.js              # Vercel serverless function entrypoint
├── Backend/
│   ├── src/
│   │   ├── config/           # Database configuration (connection pooling)
│   │   ├── controllers/      # Auth & Notes business logic
│   │   ├── middleware/       # Auth guard & global error handler
│   │   ├── model/            # Mongoose schemas (User, Note)
│   │   └── routes/           # Express route definitions (/api/auth, /api/notes)
│   ├── app.js                # Express app configuration & middleware
│   ├── server.js             # Local development server entrypoint
│   └── package.json          # Backend dependencies & scripts
├── Frontend/
│   ├── src/
│   │   ├── assets/           # Backgrounds & vector graphics
│   │   ├── components/       # UI components (dashboard, notes, common modals)
│   │   ├── context/          # Global state (AuthContext, ThemeContext)
│   │   ├── hooks/            # Custom hooks (useAuth, useTheme, useNotes)
│   │   ├── pages/            # Page layouts (Login, Register, Dashboard)
│   │   ├── routes/           # Private & Public route wrappers
│   │   ├── services/         # Axios API clients
│   │   ├── utils/            # Image compression & helpers
│   │   ├── App.jsx           # Root application component
│   │   └── index.css         # Global styles & dark mode definitions
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.js        # Vite build configuration
├── package.json              # Root monorepo build script & dependencies
├── vercel.json               # Vercel monorepo routing & build configuration
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas/database) account or local MongoDB instance

---

### 1. Clone the Repository

```bash
git clone https://github.com/Ubaid-devs-coder/Notes-APP.git
cd Notes-APP
```

---

### 2. Configure Environment Variables

#### Backend Environment (`Backend/.env`)
Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

#### Frontend Environment (`Frontend/.env`)
Create a `.env` file in the `Frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### 3. Install Dependencies & Run

#### Terminal 1 — Start Backend:
```bash
cd Backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

#### Terminal 2 — Start Frontend:
```bash
cd Frontend
npm install
npm run dev
# Application runs on http://localhost:5173
```

---

## 📡 API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Log in user and receive JWT token & cookie | ❌ |
| `POST` | `/api/auth/logout` | Clear session cookie & log out | ❌ |
| `GET` | `/api/auth/profile` | Get current authenticated user profile | ✅ |
| `PUT` | `/api/auth/profile` | Update profile info (avatar, name, bio, etc.) | ✅ |
| `PUT` | `/api/auth/change-password` | Change user password | ✅ |
| `DELETE` | `/api/auth/delete-account` | Permanently delete account and all user notes | ✅ |

### Notes (`/api/notes`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/notes` | Get all non-trashed notes | ✅ |
| `POST` | `/api/notes` | Create a new note | ✅ |
| `GET` | `/api/notes/:id` | Get details of a single note | ✅ |
| `PUT` | `/api/notes/:id` | Update note title, content, or color | ✅ |
| `DELETE` | `/api/notes/:id` | Soft delete note (move to trash) | ✅ |
| `PUT` | `/api/notes/:id/pin` | Toggle pin status | ✅ |
| `PUT` | `/api/notes/:id/archive` | Toggle archive status | ✅ |
| `GET` | `/api/notes/archive` | Fetch all archived notes | ✅ |
| `GET` | `/api/notes/pinned` | Fetch all pinned notes | ✅ |
| `GET` | `/api/notes/trash` | Fetch all trashed notes | ✅ |
| `PUT` | `/api/notes/:id/restore` | Restore note from trash | ✅ |
| `DELETE` | `/api/notes/:id/permanent`| Permanently delete note from database | ✅ |
| `GET` | `/api/notes/search?q=...` | Search notes by query string | ✅ |
| `GET` | `/api/notes/stats` | Get count statistics for dashboard cards | ✅ |

---

## ☁️ Deployment

### 1-Click Unified Vercel Deployment (Recommended)
This repository is pre-configured to deploy both the frontend and backend serverless function under a single project on Vercel with zero CORS configuration needed.

#### Step 1: Import in Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** → **Project** and import **`Notes-APP`**.
3. Keep **Root Directory** as **`./`** (do not select `Frontend` or `Backend`).
4. Framework preset: **Other** (Vercel automatically uses `vercel.json`).

#### Step 2: Environment Variables
Add the following two environment variables in Vercel:

| Key | Value | Description |
| :--- | :--- | :--- |
| `MONGO_URI` | `mongodb+srv://yt:5hc7_J7TTiS3V9s@yt-complete-backend.0j1mfw2.mongodb.net/notes` | MongoDB Atlas URI |
| `JWT_SECRET` | `0b9a9f70941159d604c165bc0220d8af09694a47510f94aac793d4b9c6be72e39b8ba9cd9701de4aa9f53fa13c41fd8796e7f58dee6cde9717d8c7070885fa92` | JWT Secret Key |

#### Step 3: Click Deploy
Click **Deploy**. Vercel will install dependencies, compile the React Vite bundle, mount the serverless API at `/api/*`, and provide you with your live URL!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/Ubaid-devs-coder/Notes-APP/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
