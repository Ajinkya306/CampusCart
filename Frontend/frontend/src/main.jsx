import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import AuthProvider from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

import {
  HelmetProvider,
} from "react-helmet-async";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <HelmetProvider>

    <React.StrictMode>

      <AuthProvider>

        <App />

        <Toaster
          position="top-right"
        />

      </AuthProvider>

    </React.StrictMode>

  </HelmetProvider>

);