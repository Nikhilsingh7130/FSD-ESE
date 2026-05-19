const Complaint = require('../models/Complaint');

// Add Complaint
exports.addComplaint = async (req, res) => {
  try {
    const { name, email, title, description, category, location } = req.body;

    const complaint = new Complaint({
      userId: req.user.id,
      name,
      email,
      title,
      description,
      category,
      location
    });

    await complaint.save();
    res.status(201).json({
      message: 'Complaint stored successfully',
      complaint
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId', 'name email');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get My Complaints
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('userId', 'name email');
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Complaint Status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, assignedDepartment } = req.body;
    
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, assignedDepartment },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({
      message: 'Complaint status updated successfully',
      complaint
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search Complaint by Location
exports.searchByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }

    const complaints = await Complaint.find({
      location: { $regex: location, $options: 'i' }
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter Complaints by Category
exports.filterByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }

    const complaints = await Complaint.find({ category });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({
      message: 'Complaint removed successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
