// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Success from './Success.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<h2 style={{ padding: 40 }}>Платеж отменён</h2>} />
    </Routes>
  </BrowserRouter>
);
