import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Patch: Ensure PUBLIC_URL does not error if referenced elsewhere (fallback to empty string)
if (typeof process === "undefined") {
  window.process = { env: {} };
}
if (typeof process.env.PUBLIC_URL === "undefined") {
  process.env.PUBLIC_URL = "";
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
