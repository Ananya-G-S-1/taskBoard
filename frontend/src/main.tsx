import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/dashboard.css";
import "./styles/board.css";
import "./styles/task.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
