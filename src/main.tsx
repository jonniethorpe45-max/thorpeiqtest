import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ensure localStorage is available for iOS WebView compatibility
const ensureStorageAvailable = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    }
  } catch (e) {
    console.warn('localStorage not available:', e);
  }
  return false;
};

// Initialize storage check before rendering
ensureStorageAvailable();

createRoot(document.getElementById("root")!).render(<App />);
