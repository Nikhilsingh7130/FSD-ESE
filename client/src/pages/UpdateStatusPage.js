import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ComplaintStatusUpdate from '../components/ComplaintStatusUpdate';

function UpdateStatusPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <div className="auth-container" style={{ marginTop: '2rem' }}>
        <div className="auth-form" style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>Update Complaint Status</h2>
            <button className="back-btn" onClick={() => navigate(-1)} style={{ margin: 0 }}>
              ← Back
            </button>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Use this page to manually update the current status and assigned department for this complaint.
          </p>
          <ComplaintStatusUpdate complaintId={id} />
        </div>
      </div>
    </div>
  );
}

export default UpdateStatusPage;
