import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import ComplaintRegistration from './components/ComplaintRegistration';
import ComplaintList from './components/ComplaintList';
import ComplaintDetails from './components/ComplaintDetails';
import UpdateStatusPage from './pages/UpdateStatusPage';
import Layout from './components/Layout';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/complaints" element={<Layout><ComplaintList /></Layout>} />
        <Route path="/file-complaint" element={<Layout><ComplaintRegistration /></Layout>} />
        <Route path="/complaint/:id" element={<Layout><ComplaintDetails /></Layout>} />
        <Route path="/update-status/:id" element={<Layout><UpdateStatusPage /></Layout>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
