const axios = require('axios');
const Complaint = require('../models/Complaint');

// AI Complaint Analyzer using Open Router API
exports.analyzeComplaint = async (req, res) => {
  try {
    const { title, description, category, complaintId } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const complaintText = `${title}. ${description}`;

    // Use Open Router API for AI analysis
    const aiAnalysis = await analyzeWithOpenRouter(complaintText, category, title);

    // Update complaint in database if complaintId provided
    if (complaintId) {
      await Complaint.findByIdAndUpdate(complaintId, {
        priority: aiAnalysis.priority,
        assignedDepartment: aiAnalysis.department,
        aiSummary: aiAnalysis.summary,
        autoResponse: aiAnalysis.autoResponse
      });
    }

    res.json({
      message: 'Complaint analyzed successfully',
      analysis: {
        priority: aiAnalysis.priority,
        suggestedDepartment: aiAnalysis.department,
        summary: aiAnalysis.summary,
        autoResponse: aiAnalysis.autoResponse
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Use Open Router API for intelligent analysis
async function analyzeWithOpenRouter(complaintText, category, title) {
  try {
    const openRouterApiKey = process.env.OPEN_ROUTER_API_KEY;
    
    if (!openRouterApiKey) {
      throw new Error('Open Router API key not configured');
    }

    // Call Open Router API with a capable model
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistral/mistral-7b-instruct:free',
        messages: [
          {
            role: 'user',
            content: `Analyze this complaint and provide:
1. Priority level (Critical, High, Medium, or Low)
2. Responsible department
3. Brief summary (max 2 sentences)
4. Professional auto-response

Complaint Category: ${category}
Title: ${title}
Description: ${complaintText}

Respond in JSON format:
{
  "priority": "...",
  "department": "...",
  "summary": "...",
  "autoResponse": "..."
}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Complaint Management System'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Parse JSON response
    let analysisData;
    try {
      const jsonMatch = content.match(/\{[^}]+\}/);
      analysisData = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch (parseErr) {
      // Fallback parsing if JSON extraction fails
      analysisData = {
        priority: content.includes('Critical') ? 'Critical' : content.includes('High') ? 'High' : 'Medium',
        department: suggestDepartmentFallback(category),
        summary: content.substring(0, 200),
        autoResponse: generateAutoResponseFallback(title, category)
      };
    }

    return {
      priority: analysisData.priority || 'Medium',
      department: analysisData.department || suggestDepartmentFallback(category),
      summary: analysisData.summary || complaintText.substring(0, 150),
      autoResponse: analysisData.autoResponse || generateAutoResponseFallback(title, category)
    };
  } catch (err) {
    console.log('Open Router API error, using fallback:', err.message);
    // Fallback to rule-based analysis if API fails
    return fallbackAnalysis(complaintText, category, title);
  }
}

// Fallback analysis if API fails
function fallbackAnalysis(text, category, title) {
  const urgentKeywords = ['urgent', 'emergency', 'critical', 'severe', 'immediately', 'danger', 'injury', 'death'];
  const highKeywords = ['important', 'significant', 'major', 'problem', 'issue', 'damage'];
  const lowerText = text.toLowerCase();

  let priority = 'Medium';
  if (urgentKeywords.some(keyword => lowerText.includes(keyword))) {
    priority = 'Critical';
  } else if (highKeywords.some(keyword => lowerText.includes(keyword))) {
    priority = 'High';
  } else if (text.split(' ').length > 100) {
    priority = 'Medium';
  } else {
    priority = 'Low';
  }

  return {
    priority,
    department: suggestDepartmentFallback(category),
    summary: generateSummaryFallback(text),
    autoResponse: generateAutoResponseFallback(title, category)
  };
}

// Suggest Department based on category
function suggestDepartmentFallback(category) {
  const departmentMap = {
    'Water Supply': 'Water Department',
    'Electricity': 'Electricity Board',
    'Garbage': 'Sanitation Department',
    'Roads': 'Public Works Department',
    'Public Safety': 'Police Department',
    'Other': 'General Services'
  };

  return departmentMap[category] || 'General Services';
}

// Generate Summary
function generateSummaryFallback(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  
  if (sentences.length > 3) {
    return `${sentences[0].trim()}. ${sentences[sentences.length - 1].trim()}.`;
  }
  return text.substring(0, 200) + '...';
}

// Generate Auto Response
function generateAutoResponseFallback(title, category) {
  return `Dear User,

Thank you for filing a complaint regarding "${title}".

Your complaint has been received and categorized under ${category}. Our system has prioritized your complaint, and it will be reviewed by the concerned department shortly.

You will receive regular updates on the status of your complaint. If you need to check the status, please use your complaint ID.

Best regards,
Complaint Management System`;
}

module.exports = exports;
