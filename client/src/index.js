import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import ComplaintRegistration from './components/ComplaintRegistration';
import ComplaintList from './components/ComplaintList';
import ComplaintDetails from './components/ComplaintDetails';
import UpdateStatusPage from './pages/UpdateStatusPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><App /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complaints" element={<Layout><ComplaintList /></Layout>} />
        <Route path="/file-complaint" element={<Layout><ComplaintRegistration /></Layout>} />
        <Route path="/complaint/:id" element={<Layout><ComplaintDetails /></Layout>} />
        <Route path="/update-status/:id" element={<Layout><UpdateStatusPage /></Layout>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
