# 🚀 Notes App - Complete Vercel Deployment Guide

This guide walks you through deploying both the **React Vite Frontend** and **Node/Express Backend** together on **Vercel** under a single project with **zero CORS issues**, **instant wake-ups**, and **one unified URL**.

---

## 📋 Architecture Overview

- **Platform**: [Vercel](https://vercel.com/) (100% Free)
- **Frontend**: React 19 + Vite + Tailwind CSS (served via Vercel Edge CDN)
- **Backend**: Express.js (runs as a Vercel Serverless Function via `api/index.js`)
- **Database**: MongoDB Atlas
- **Single Domain**: Both Frontend and Backend share the same origin (e.g., `https://your-notes-app.vercel.app` and `https://your-notes-app.vercel.app/api/*`)

---

## ⚡ Step 1: Push Your Code to GitHub

Open a terminal (PowerShell or Bash) in your project root:

```bash
# 1. Stage all files
git add .

# 2. Commit the changes
git commit -m "Configure 100% Vercel monorepo deployment"

# 3. Push to your GitHub repository
git push origin main
```

---

## 🌐 Step 2: Create a New Project on Vercel

1. Open your browser and go to **[vercel.com](https://vercel.com/)**.
2. Sign in with your **GitHub** account.
3. On the Vercel Dashboard, click **Add New...** → **Project**.
4. Find your repository **`Notes-APP`** (or `Ubaid-devs-coder/Notes-APP`) and click **Import**.

---

## ⚙️ Step 3: Configure Project Settings on Vercel

In the **Configure Project** screen:

1. **Project Name**: Keep as `notes-app` (or change to your preferred name).
2. **Framework Preset**: Leave as **Other** (Vercel will detect configuration from `vercel.json`).
3. **Root Directory**: Leave as **`./`** (the project root directory).
   > ⚠️ **Important**: Do **NOT** select `Frontend` or `Backend`. Leave it as the root directory `./` so Vercel can build both the frontend and the serverless backend.
4. **Build and Output Settings**: Leave toggles as default — `vercel.json` handles the build command (`cd Frontend && npm install && npm run build`) and output directory (`Frontend/dist`).

---

## 🔑 Step 4: Add Environment Variables

Scroll down to the **Environment Variables** section and add the following two variables:

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `MONGO_URI` | `mongodb+srv://yt:5hc7_J7TTiS3V9s@yt-complete-backend.0j1mfw2.mongodb.net/notes` | MongoDB Atlas database connection string |
| `JWT_SECRET` | `0b9a9f70941159d604c165bc0220d8af09694a47510f94aac793d4b9c6be72e39b8ba9cd9701de4aa9f53fa13c41fd8796e7f58dee6cde9717d8c7070885fa92` | Secret key used to sign and verify JWT tokens |

*(Optional)* If you want to explicitly define the API base URL:
- `VITE_API_BASE_URL` = `/api` *(Frontend already defaults to `/api` in production)*

---

## 🚀 Step 5: Deploy

1. Click the **Deploy** button.
2. Vercel will:
   - Install root dependencies (`express`, `mongoose`, `jsonwebtoken`, etc.).
   - Run the frontend build script (`cd Frontend && npm install && npm run build`).
   - Bundle the serverless backend function (`api/index.js`).
   - Output your live production URL (e.g., `https://notes-app-xyz.vercel.app`).
3. Click on the live link to open your application!

---

## 🔍 Step 6: Verify Your Deployment

Once the deployment completes:
1. **Visit the URL**: Open `https://your-app.vercel.app`.
2. **Register a New Account**: Go to `/register`, enter your name, email, and password.
3. **Create a Note**: Click the **+** floating button to create and color-code a note.
4. **Toggle Theme**: Click the Sun/Moon icon in the navbar to test Dark & Light modes.
5. **Upload Photo**: Go to Settings → Upload a profile picture to verify fast client-side compression.

---

## 🛠️ How It Works Behind the Scenes

- **`api/index.js`**: Bridges incoming Vercel serverless requests directly to your existing Express application in `Backend/app.js`.
- **`vercel.json`**:
  - Directs `/api/(.*)` requests to the `api/index.js` serverless function.
  - Directs all other page requests (`/login`, `/register`, `/dashboard`) to `Frontend/dist/index.html` for smooth SPA routing without 404s.
- **`Backend/src/config/db.js`**: Automatically checks `mongoose.connection.readyState` before connecting, reusing existing connections across serverless function invocations to protect your database connection pool.
- **`Backend/app.js`**: Accepts same-origin requests and any `*.vercel.app` domain automatically.

---

## 💡 Ongoing Updates (Auto-Deploy)

Vercel automatically sets up CI/CD with your GitHub repository:
- Whenever you make changes locally, simply run:
  ```bash
  git add .
  git commit -m "Your update message"
  git push origin main
  ```
- Vercel will automatically detect the commit, trigger a fresh build, and update your live site within seconds!

---

## ❓ Troubleshooting

### 1. Database Connection Timeout
- Go to [MongoDB Atlas](https://cloud.mongodb.com/).
- Navigate to **Security** → **Network Access**.
- Ensure that IP Address `0.0.0.0/0` (Allow Access from Anywhere) is active so Vercel serverless instances can connect.

### 2. Page Refresh Returns 404
- Ensure `vercel.json` is at the root of your project. The rewrite rule `{ "source": "/(.*)", "destination": "/index.html" }` handles client-side routing.
