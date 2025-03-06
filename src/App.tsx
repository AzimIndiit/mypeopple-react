import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/Routes";

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
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;