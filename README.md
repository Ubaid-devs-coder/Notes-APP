<div align="center">

# 📝 NoteFlow — Full-Stack Notes Application

### ✨ Create. Organize. Search. Archive. Restore.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge\&logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge\&logo=express\&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)](https://www.mongodb.com/)

<br>

🚀 **[Live Demo](https://notes-app-nine-phi-86.vercel.app)**
⭐ **[GitHub Repository](https://github.com/Ubaid-devs-coder/Notes-APP)**
🐛 **[Report an Issue](https://github.com/Ubaid-devs-coder/Notes-APP/issues)**

</div>

---

## 📖 About The Project

**NoteFlow** is a modern full-stack notes application built with the **MERN stack**.

It allows users to create and manage notes, organize important information, search instantly, pin important notes, archive old notes, and recover deleted notes from Trash.

The application focuses on a **clean, responsive, and modern user experience** across desktop, tablet, and mobile devices.

### 🎯 Key Highlights

* 📝 Complete note management system
* 📌 Pin important notes
* 🗃️ Archive notes
* 🗑️ Trash and restore system
* 🔎 Real-time note search
* 🎨 Custom note colors
* 🌙 Light & dark themes
* 🔐 JWT authentication
* 💾 MongoDB database
* 📱 Fully responsive design
* ⚡ Optimized image uploads
* 📊 Dashboard statistics

---

## ✨ Features

| Feature             | Description                            |
| ------------------- | -------------------------------------- |
| 📝 CRUD Notes       | Create, read, update, and delete notes |
| 📌 Pin Notes        | Keep important notes at the top        |
| 🗃️ Archive         | Move notes out of the main dashboard   |
| 🗑️ Trash           | Soft-delete notes safely               |
| ♻️ Restore          | Recover notes from Trash               |
| ❌ Permanent Delete  | Permanently remove unwanted notes      |
| 🔎 Search           | Search notes by title and content      |
| 🎨 Note Colors      | Choose from 6 different colors         |
| 📊 Statistics       | View note counts and dashboard stats   |
| 🌙 Dark Mode        | Modern ambient dark theme              |
| ☀️ Light Mode       | Clean light interface                  |
| 🔐 Authentication   | Secure JWT-based login system          |
| 📱 Responsive UI    | Works on mobile, tablet & desktop      |
| ⚡ Image Compression | Compress profile images before upload  |
| 📄 Pagination       | Navigate large collections of notes    |

---

## 🎨 User Experience

NoteFlow is designed around a simple workflow:

```text
        👤 Login / Register
                ↓
        🏠 Personal Dashboard
                ↓
       ┌────────┼────────┐
       ↓        ↓        ↓
     📝 Notes   📌 Pinned  🗃️ Archive
       │
       ↓
     🔎 Search
       │
       ↓
     🗑️ Trash
       │
       ├── ♻️ Restore
       │
       └── ❌ Delete Permanently
```

### 🌈 Theme Experience

The application supports:

* ☀️ Light Mode
* 🌙 Ambient Dark Mode
* ✨ Smooth theme switching
* 💫 Modern card hover effects
* 📱 Mobile-friendly navigation

---

## 🖼️ Screenshot

Add your project screenshot here:

```md
![NoteFlow Screenshot](./screenshot.png)
```

> 💡 You can add multiple screenshots later for Desktop, Mobile, Dashboard, Login, and Dark Mode.

---

## 🛠️ Tech Stack

<details open>
<summary><b>🎨 Frontend</b></summary>

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| React 19         | UI development                 |
| Vite             | Development & production build |
| Tailwind CSS v4  | Styling                        |
| CSS3             | Custom UI styling              |
| React Router DOM | Application routing            |
| Axios            | API communication              |
| Lucide React     | Icons                          |
| React Hot Toast  | Notifications                  |

</details>

<details>
<summary><b>⚙️ Backend</b></summary>

| Technology    | Purpose                |
| ------------- | ---------------------- |
| Node.js       | Backend runtime        |
| Express.js 5  | REST API               |
| MongoDB       | Database               |
| Mongoose      | MongoDB ODM            |
| JWT           | Authentication         |
| bcrypt        | Password hashing       |
| Cookie Parser | Authentication cookies |
| CORS          | Cross-origin requests  |

</details>

---

## 📂 Project Structure

```bash
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

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have installed:

* Node.js 18+
* npm
* MongoDB Atlas or local MongoDB
* VS Code (Recommended)

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Ubaid-devs-coder/Notes-APP.git
```

```bash
cd Notes-APP
```

---

### 2️⃣ Backend Environment Variables

Create:

```text
Backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=http://localhost:5173
```

---

### 3️⃣ Frontend Environment Variables

Create:

```text
Frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### 4️⃣ Install Backend

```bash
cd Backend
npm install
```

Start the backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

### 5️⃣ Install Frontend

Open another terminal:

```bash
cd Frontend
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🎮 How To Use

### 👤 Authentication

1. Create an account.
2. Login with your credentials.
3. Access your personal dashboard.

### 📝 Create a Note

1. Click **Add Note**.
2. Enter the title.
3. Enter your content.
4. Select a note color.
5. Save your note.

### 📌 Pin a Note

Click the **Pin** option to keep an important note at the top.

### 🗃️ Archive

Move completed or reference notes into the Archive section.

### 🗑️ Delete & Restore

Deleted notes move to Trash instead of immediately disappearing permanently.

From Trash you can:

```text
🗑️ Delete
   ↓
📦 Trash
   ↓
┌───────────────┐
│ ♻️ Restore    │
│ ❌ Delete     │
│ Permanently   │
└───────────────┘
```

---

## 🔐 Authentication Flow

```text
Register
   ↓
Password → bcrypt hashing
   ↓
MongoDB
   ↓
Login
   ↓
JWT Token
   ↓
Secure Cookie / Bearer Token
   ↓
Protected Routes
```

---

## 📡 API Reference

### 🔐 Authentication — `/api/auth`

| Method   | Endpoint                    | Description     |
| -------- | --------------------------- | --------------- |
| `POST`   | `/api/auth/register`        | Register user   |
| `POST`   | `/api/auth/login`           | Login user      |
| `POST`   | `/api/auth/logout`          | Logout user     |
| `GET`    | `/api/auth/profile`         | Get profile     |
| `PUT`    | `/api/auth/profile`         | Update profile  |
| `PUT`    | `/api/auth/change-password` | Change password |
| `DELETE` | `/api/auth/delete-account`  | Delete account  |

### 📝 Notes — `/api/notes`

| Method   | Endpoint                   | Description          |
| -------- | -------------------------- | -------------------- |
| `GET`    | `/api/notes`               | Get notes            |
| `POST`   | `/api/notes`               | Create note          |
| `GET`    | `/api/notes/:id`           | Get single note      |
| `PUT`    | `/api/notes/:id`           | Update note          |
| `DELETE` | `/api/notes/:id`           | Move to trash        |
| `PUT`    | `/api/notes/:id/pin`       | Pin/unpin            |
| `PUT`    | `/api/notes/:id/archive`   | Archive/unarchive    |
| `GET`    | `/api/notes/archive`       | Get archived notes   |
| `GET`    | `/api/notes/pinned`        | Get pinned notes     |
| `GET`    | `/api/notes/trash`         | Get trashed notes    |
| `PUT`    | `/api/notes/:id/restore`   | Restore note         |
| `DELETE` | `/api/notes/:id/permanent` | Permanent delete     |
| `GET`    | `/api/notes/search?q=...`  | Search notes         |
| `GET`    | `/api/notes/stats`         | Dashboard statistics |

---

## 📱 Responsive Design

NoteFlow is designed for different screen sizes:

```text
🖥️ Desktop
      ↓
💻 Laptop
      ↓
📱 Tablet
      ↓
📱 Mobile
```

Mobile experience includes:

* 📲 Bottom navigation
* 👆 Touch-friendly buttons
* 📐 Responsive cards
* 🔎 Adaptive search
* 🪟 Mobile-friendly modals

---

## ⚡ Image Optimization

Profile images are compressed on the client before uploading.

```text
📷 Original Image
       ↓
✂️ Center Crop
       ↓
⬜ 1:1 Aspect Ratio
       ↓
🖼️ Resize 384×384
       ↓
📦 Compress
       ↓
☁️ Upload
```

This reduces unnecessary upload size and improves performance.

---

## 📚 Concepts Practiced

### Frontend

* React Components
* React Hooks
* Context API
* React Router
* Axios
* DOM/UI interaction
* Responsive design
* Component reusability
* Theme management

### Backend

* REST APIs
* Express middleware
* Controllers
* Authentication
* JWT
* Password hashing
* Error handling
* CORS

### Database

* MongoDB
* Mongoose
* Schemas
* CRUD operations
* User-specific data

### Deployment

* Vercel
* Environment variables
* Serverless API
* Production configuration

---

## 🔮 Future Improvements

<details>
<summary>🚀 Click to expand</summary>

* 🤝 Real-time collaboration
* 🏷️ Note tags
* 📅 Reminders
* 🔔 Notifications
* 🔍 Advanced search
* 📊 More detailed analytics
* 📤 Export notes as PDF
* 📥 Import notes
* ☁️ Cloud image storage
* 🧑‍🤝‍🧑 Note sharing
* 📝 Rich text editor
* 📱 PWA support

</details>

---

## 🧪 Testing Checklist

```text
☐ Register a new account
☐ Login / Logout
☐ Create a note
☐ Edit a note
☐ Delete a note
☐ Restore a note
☐ Permanently delete a note
☐ Pin / Unpin
☐ Archive / Unarchive
☐ Search notes
☐ Test pagination
☐ Change note colors
☐ Test Light Mode
☐ Test Dark Mode
☐ Test profile update
☐ Test password change
☐ Test mobile responsiveness
☐ Refresh browser and verify data
```

---

## ☁️ Deployment

### 🚀 Vercel

The project can be deployed using Vercel.

Basic process:

```text
GitHub Repository
       ↓
     Vercel
       ↓
Environment Variables
       ↓
     Build
       ↓
🌐 Live Application
```

Make sure production environment variables are configured:

```env
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
```

---

## 🤝 Contributing

Contributions are welcome!

### Fork the repository

```bash
git checkout -b feature/my-feature
```

Make your changes, then:

```bash
git add .
git commit -m "Add my feature"
git push origin feature/my-feature
```

Finally, open a Pull Request.

---

## 🐛 Issues & Feedback

Found a bug or have an idea?

👉 **[Create an Issue](https://github.com/Ubaid-devs-coder/Notes-APP/issues)**

Your feedback is always welcome! 💡

---

## 👨‍💻 Author

<div align="center">

### **Ubaid Ur Rehman**

💻 **MERN Stack Developer**

🎓 **Computer Science**

<br>

🌐 **GitHub:**
https://github.com/Ubaid-devs-coder

</div>

---

## 🙏 Acknowledgements

* React Documentation
* Vite Documentation
* Tailwind CSS Documentation
* Node.js Documentation
* Express.js Documentation
* MongoDB Documentation
* MDN Web Docs

---

<div align="center">

### ⭐ If you like NoteFlow, give this project a star!

<br>

**Made with ❤️ by Ubaid Ur Rehman**

</div>
