import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

// Import the Tailwind CSS file here
import "./index.css"; // Ensure this points to the file where Tailwind CSS is set up

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
