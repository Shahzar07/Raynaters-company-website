import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const initApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical: Could not find root element '#root'");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Raynaters App mounted successfully.");
  } catch (err) {
    console.error("Failed to render React application:", err);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: #ef4444;">
        <h1>Application Error</h1>
        <p>There was an error initializing the application. Please check the console for details.</p>
      </div>
    `;
  }
};

// Ensure DOM is fully parsed if module executes early
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}