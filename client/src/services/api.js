import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Auth Service
export const authService = {
  register: async (name, email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      return axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return null;
  }
};

// Complaint Service
export const complaintService = {
  addComplaint: async (complaintData) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_BASE_URL}/complaints`, complaintData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getMyComplaints: async () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_BASE_URL}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getAllComplaints: async () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_BASE_URL}/complaints/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getComplaintById: async (id) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_BASE_URL}/complaints/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  updateComplaintStatus: async (id, status, department) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_BASE_URL}/complaints/${id}`, 
      { status, assignedDepartment: department },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  searchByLocation: async (location) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_BASE_URL}/complaints/search/location?location=${location}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  filterByCategory: async (category) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_BASE_URL}/complaints/filter/category?category=${category}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  deleteComplaint: async (id) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_BASE_URL}/complaints/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

// AI Service
export const aiService = {
  analyzeComplaint: async (title, description, category, complaintId) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_BASE_URL}/ai/analyze`,
      { title, description, category, complaintId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
};
