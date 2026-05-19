import React, { useState, useEffect } from 'react';
import { aiService } from '../services/api';
import '../styles/AIAnalysis.css';

function AIAnalysisDisplay({ complaint }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (complaint && !analysis) {
      performAnalysis();
    }
  }, [complaint]);

  const performAnalysis = async () => {
    if (!complaint) return;
    
    setLoading(true);
    try {
      const response = await aiService.analyzeComplaint(
        complaint.title,
        complaint.description,
        complaint.category,
        complaint._id
      );
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error analyzing complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Analyzing complaint...</div>;
  if (!analysis) return <div>No analysis available</div>;

  return (
    <div className="ai-analysis-display">
      <h2>AI Analysis Results</h2>
      
      <div className="analysis-item">
        <label>Detected Priority:</label>
        <span className={`priority priority-${analysis.priority.toLowerCase()}`}>
          {analysis.priority}
        </span>
      </div>

      <div className="analysis-item">
        <label>Recommended Department:</label>
        <span>{analysis.suggestedDepartment}</span>
      </div>

      <div className="analysis-item">
        <label>AI Generated Summary:</label>
        <p>{analysis.summary}</p>
      </div>

      <div className="analysis-item">
        <label>Auto Response:</label>
        <div className="auto-response-box">
          <p>{analysis.autoResponse}</p>
        </div>
      </div>
    </div>
  );
}

export default AIAnalysisDisplay;
