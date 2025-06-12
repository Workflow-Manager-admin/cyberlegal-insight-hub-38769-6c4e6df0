import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Patch: Ensure PUBLIC_URL does not error if referenced elsewhere (fallback to empty string)
/* Ensure global PUBLIC_URL variable for template/build compatibility */
var PUBLIC_URL = (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL) ? process.env.PUBLIC_URL : "";
if (typeof process === "undefined") {
  window.process = { env: {} };
}
if (typeof process.env.PUBLIC_URL === "undefined") {
  process.env.PUBLIC_URL = "";
}
// Defensive global PUBLIC_URL declaration for template compatibility
if (typeof window.PUBLIC_URL === "undefined") {
  window.PUBLIC_URL = process.env.PUBLIC_URL || "";
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
