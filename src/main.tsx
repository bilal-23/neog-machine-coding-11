import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { MoviesProvider } from "./context/movies-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MoviesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoviesProvider>
  </React.StrictMode>
);
