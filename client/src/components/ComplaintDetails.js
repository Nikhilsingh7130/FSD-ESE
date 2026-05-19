import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintService } from '../services/api';
import AIAnalysisDisplay from './AIAnalysisDisplay';
import ComplaintStatusUpdate from './ComplaintStatusUpdate';
import '../styles/ComplaintDetails.css';

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        setLoading(true);
        const response = await complaintService.getComplaintById(id);
        setComplaint(response.data);
      } catch (err) {
        setError('Failed to fetch complaint details: ' + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintDetails();
  }, [id]);

  if (loading) {
    return <div className="complaint-details-loading">Loading complaint details...</div>;
  }

  if (error) {
    return <div className="complaint-details-error">{error}</div>;
  }

  if (!complaint) {
    return <div className="complaint-details-notfound">Complaint not found</div>;
  }

  return (
    <div className="complaint-details-container">
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2>Complaint Details</h2>
      </div>

      <div className="details-content">
        <div className="info-card">
          <h3>Basic Information</h3>
          <p><strong>Title:</strong> {complaint.title}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Location:</strong> {complaint.location}</p>
          <p><strong>Status:</strong> <span className={`status-badge status-${complaint.status?.toLowerCase().replace(' ', '-')}`}>{complaint.status}</span></p>
          <p><strong>Description:</strong></p>
          <div className="description-box">{complaint.description}</div>
          <p><strong>Reported By:</strong> {complaint.name} ({complaint.email})</p>
          <p><strong>Reported On:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          {complaint.assignedDepartment && (
            <p><strong>Assigned Department:</strong> {complaint.assignedDepartment}</p>
          )}
        </div>

        <div className="analysis-card">
          <AIAnalysisDisplay complaint={complaint} />
        </div>
        
        <div className="admin-actions-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ borderBottom: 'none', margin: 0, padding: 0 }}>Update Status</h3>
            <p style={{ margin: '0.5rem 0 0 0' }}>Manually update the current status of this complaint.</p>
          </div>
          <button 
            className="btn-new-complaint" 
            onClick={() => navigate(`/update-status/${complaint._id}`)}
          >
            Go to Status Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
