// src/main.jsx

import "./sentry.js";

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(

  <HelmetProvider>
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </BrowserRouter>
    </HelmetProvider>
);
