import React, { useState } from 'react';
import { complaintService, aiService } from '../services/api';
import '../styles/ComplaintRegistration.css';

function ComplaintRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    category: 'Water Supply',
    location: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await complaintService.addComplaint(formData);
      
      // Analyze complaint with AI
      const aiResult = await aiService.analyzeComplaint(
        formData.title,
        formData.description,
        formData.category,
        response.data.complaint._id
      );

      setAiAnalysis(aiResult.data.analysis);
      setMessage('Complaint registered successfully!');
      
      setFormData({
        name: '',
        email: '',
        title: '',
        description: '',
        category: 'Water Supply',
        location: ''
      });
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-registration">
      <h1>File a Complaint</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <textarea
          name="description"
          placeholder="Complaint Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        
        <select name="category" value={formData.category} onChange={handleChange}>
          <option>Water Supply</option>
          <option>Electricity</option>
          <option>Garbage</option>
          <option>Roads</option>
          <option>Public Safety</option>
          <option>Other</option>
        </select>
        
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      {aiAnalysis && (
        <div className="ai-analysis">
          <h2>AI Analysis Results</h2>
          <p><strong>Priority:</strong> {aiAnalysis.priority}</p>
          <p><strong>Department:</strong> {aiAnalysis.suggestedDepartment}</p>
          <p><strong>Summary:</strong> {aiAnalysis.summary}</p>
          <div className="auto-response">
            <strong>Auto Response:</strong>
            <p>{aiAnalysis.autoResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintRegistration;
