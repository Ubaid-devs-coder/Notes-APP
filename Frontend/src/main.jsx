import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NoteProvider>
          <App />
          <Toaster position="top-right" />
        </NoteProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
