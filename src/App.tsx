import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/Routes";

function App() {
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