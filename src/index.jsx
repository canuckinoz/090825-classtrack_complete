import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Assuming your main App component is in App.jsx
import './index.css'; // Assuming you have a main CSS file

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element. Please ensure your HTML has an element with id='root'.");
}




