import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintService } from '../services/api';
import '../styles/ComplaintList.css';

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchComplaints();
  }, [navigate]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError('');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : {};
      
      let response;
      if (user.role === 'admin') {
        response = await complaintService.getAllComplaints();
      } else {
        response = await complaintService.getMyComplaints();
      }
      setComplaints(response.data);
      setFilteredComplaints(response.data);
    } catch (error) {
      setError('Error fetching complaints: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchLocation.trim()) {
      setFilteredComplaints(complaints);
      setError('');
      return;
    }

    try {
      setError('');
      const response = await complaintService.searchByLocation(searchLocation);
      setFilteredComplaints(response.data);
    } catch (error) {
      setError('Search error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleFilterCategory = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (!category) {
      setFilteredComplaints(complaints);
      setError('');
      return;
    }

    try {
      setError('');
      const response = await complaintService.filterByCategory(category);
      setFilteredComplaints(response.data);
    } catch (error) {
      setError('Filter error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleNewComplaint = () => {
    navigate('/file-complaint');
  };

  if (loading) {
    return (
      <div className="complaint-list">
        <div className="loading">Loading your complaints...</div>
      </div>
    );
  }

  return (
    <div className="complaint-list">
      <div className="list-header">
        <h1>📋 {JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' ? 'All Complaints' : 'My Complaints'}</h1>
        <button onClick={handleNewComplaint} className="btn-new-complaint">+ File New Complaint</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn-search">Search</button>
        </form>

        <select value={selectedCategory} onChange={handleFilterCategory} className="category-filter">
          <option value="">All Categories</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
          <option value="Roads">Roads</option>
          <option value="Public Safety">Public Safety</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="no-complaints">
          <p>No complaints found. <button onClick={handleNewComplaint} className="link-btn">File your first complaint!</button></p>
        </div>
      ) : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id} className={`priority-${complaint.priority?.toLowerCase() || 'medium'}`}>
                <td><strong>{complaint.title}</strong></td>
                <td>{complaint.category}</td>
                <td>{complaint.location}</td>
                <td><span className={`status-badge status-${complaint.status?.toLowerCase().replace(' ', '-')}`}>{complaint.status}</span></td>
                <td><span className={`priority-badge priority-${complaint.priority?.toLowerCase() || 'medium'}`}>{complaint.priority || 'N/A'}</span></td>
                <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => navigate(`/complaint/${complaint._id}`)} className="link-btn">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="list-footer">
        <p>Total Complaints: <strong>{filteredComplaints.length}</strong></p>
      </div>
    </div>
  );
}

export default ComplaintList;
