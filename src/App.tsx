import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // function adjustZoom() {
  //   document.documentElement.style.zoom = (1 / window.devicePixelRatio).toString();
  // }

  // // Apply on load
  // adjustZoom();

  // // Reapply if the screen scale changes (e.g., external display)
  // window.addEventListener("resize", adjustZoom);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
