// CRITICAL: Import safe storage FIRST before any other imports
// This polyfills localStorage for iOS WebView compatibility
import "./lib/safeStorage";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
