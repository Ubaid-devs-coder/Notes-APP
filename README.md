<div align="center">

# 📝 NoteFlow

### A modern full-stack notes app built for speed, simplicity, and a smooth user experience.

<p>
  <strong>Create.</strong> <strong>Organize.</strong> <strong>Search.</strong> <strong>Archive.</strong> <strong>Restore.</strong>
</p>

<p>
  <a href="https://notes-app-nine-phi-86.vercel.app">🚀 Live Demo</a>
  ·
  <a href="https://github.com/Ubaid-devs-coder/Notes-APP">⭐ GitHub Repository</a>
  ·
  <a href="https://github.com/Ubaid-devs-coder/Notes-APP/issues">🐛 Report an Issue</a>
</p>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## ✨ Why NoteFlow?

NoteFlow is a full-stack note-taking application focused on a clean interface and practical everyday workflows.

It combines a responsive React frontend with an Express/Node.js backend and MongoDB database, while adding useful productivity features such as pinning, archiving, trash recovery, instant search, themes, and optimized image uploads.

> 💡 **Built with a real-world MERN architecture** — authentication, protected APIs, database persistence, reusable components, responsive UI, and deployment support.

---

## 🎯 Features

### 🗒️ Note Management

- ✅ Create, read, update, and delete notes
- 📌 Pin important notes
- 🗃️ Archive notes without deleting them
- 🗑️ Move notes to a dedicated Trash area
- ♻️ Restore deleted notes
- ❌ Permanently delete notes
- 🔎 Search notes by title and content
- 📊 Dashboard note statistics
- 🎨 Choose from 6 note color options
- 📄 Pagination and category filtering

### 🎨 Modern UI/UX

- 🌞 Light mode
- 🌙 Ambient dark mode
- ✨ Frosted/glowing visual effects
- 📱 Responsive mobile, tablet, and desktop layouts
- 📲 Mobile bottom navigation
- 🖱️ Smooth hover interactions
- 🧩 Reusable modals and UI components
- 🔔 Toast notifications for user feedback

### 🖼️ Optimized Image Uploads

Profile images are processed on the client before upload:

```text
Original photo
     ↓
Center crop
     ↓
1:1 aspect ratio
     ↓
Canvas resize to 384×384
     ↓
Compressed image
```

This helps reduce large camera images significantly before they reach the server.

### 🔐 Authentication & Security

- 🔑 JWT-based authentication
- 🔒 Password hashing with bcrypt
- 🍪 HTTP-only cookie support
- 🪪 Bearer-token fallback
- 🛡️ Protected frontend routes
- 🛡️ Protected backend API endpoints
- 🚪 Logout and account deletion support

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| 🎨 Frontend | React 19, Vite, Tailwind CSS v4, CSS |
| 🧭 Routing | React Router DOM v7 |
| 🌐 HTTP | Axios |
| 🎨 Icons | Lucide React |
| 🔔 Notifications | React Hot Toast |
| ⚙️ Backend | Node.js, Express.js 5 |
| 🗄️ Database | MongoDB + Mongoose |
| 🔐 Security | JWT, bcrypt, cookies, CORS |
| ☁️ Deployment | Vercel / Render |

---

## 🏗️ Project Architecture

```text
┌──────────────────────────────┐
│          React UI            │
│      Vite + Tailwind CSS     │
└──────────────┬───────────────┘
               │
               │ Axios / REST API
               ▼
┌──────────────────────────────┐
│       Express.js API         │
│ Controllers + Middleware     │
└──────────────┬───────────────┘
               │
               │ Mongoose
               ▼
┌──────────────────────────────┐
│          MongoDB             │
│       Users + Notes          │
└──────────────────────────────┘
```

---

## 📁 Folder Structure

```text
Notes-APP/
│
├── api/
│   └── index.js
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── model/
│   │   └── routes/
│   │
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── package.json
├── vercel.json
└── README.md
```

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Ubaid-devs-coder/Notes-APP.git
cd Notes-APP
```

### 2. Backend environment variables

Create:

```text
Backend/.env
```

Add your own values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend environment variables

Create:

```text
Frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Install backend dependencies

```bash
cd Backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 📡 API Overview

### 🔐 Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Create account |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/profile` | Get profile |
| `PUT` | `/api/auth/profile` | Update profile |
| `PUT` | `/api/auth/change-password` | Change password |
| `DELETE` | `/api/auth/delete-account` | Delete account |

### 📝 Notes

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/notes` | Get active notes |
| `POST` | `/api/notes` | Create note |
| `GET` | `/api/notes/:id` | Get one note |
| `PUT` | `/api/notes/:id` | Update note |
| `DELETE` | `/api/notes/:id` | Move note to trash |
| `PUT` | `/api/notes/:id/pin` | Toggle pin |
| `PUT` | `/api/notes/:id/archive` | Toggle archive |
| `GET` | `/api/notes/archive` | Get archived notes |
| `GET` | `/api/notes/pinned` | Get pinned notes |
| `GET` | `/api/notes/trash` | Get trash |
| `PUT` | `/api/notes/:id/restore` | Restore note |
| `DELETE` | `/api/notes/:id/permanent` | Permanently delete |
| `GET` | `/api/notes/search?q=...` | Search notes |
| `GET` | `/api/notes/stats` | Get dashboard statistics |

---

## ☁️ Deployment

The project includes configuration for unified Vercel deployment.

### Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Keep the repository root as the project root.
4. Configure the required environment variables.
5. Deploy.

### Required production variables

```env
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
```

> 🔐 **Security:** Never commit real MongoDB connection strings, JWT secrets, API keys, or passwords to GitHub. If credentials have ever been committed publicly, rotate/revoke them immediately and replace them with environment variables.

---

## 🧪 Development Checklist

Before pushing changes:

```text
☐ Test registration/login
☐ Test creating and editing notes
☐ Test pin/archive functionality
☐ Test trash → restore flow
☐ Test permanent deletion
☐ Test search and pagination
☐ Test light/dark mode
☐ Test mobile responsiveness
☐ Check environment variables
☐ Check production build
```

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

```bash
# 1. Fork the project

# 2. Create a branch
git checkout -b feature/my-feature

# 3. Commit your changes
git commit -m "Add my feature"

# 4. Push the branch
git push origin feature/my-feature

# 5. Open a Pull Request
```

---

## 🐛 Issues & Feedback

Found a bug or have an idea?

👉 https://github.com/Ubaid-devs-coder/Notes-APP/issues

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

### ⭐ If you like NoteFlow, consider giving the repository a star!

**Built with ❤️ using the MERN stack**

</div>
