import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ensures the JSX extension is used
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
