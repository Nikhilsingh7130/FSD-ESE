import React, { useState } from 'react';
import { complaintService } from '../services/api';
import '../styles/ComplaintStatusUpdate.css';

function ComplaintStatusUpdate({ complaintId }) {
  const [status, setStatus] = useState('Pending');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await complaintService.updateComplaintStatus(complaintId, status, department);
      setMessage('Complaint status updated successfully!');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="status-update">
      <h2>Update Complaint Status</h2>
      
      <form onSubmit={handleUpdate}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>Under Review</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <input
          type="text"
          placeholder="Assigned Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ComplaintStatusUpdate;
