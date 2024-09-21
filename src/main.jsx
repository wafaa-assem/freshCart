// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'flowbite/dist/flowbite.min.js'
import "flowbite";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
//   <StrictMode>
    <App />
//   </StrictMode>
);
