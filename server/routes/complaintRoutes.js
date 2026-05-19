const express = require('express');
const complaintController = require('../controllers/complaintController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateComplaint, validate } = require('../middleware/validation');

const router = express.Router();

// Add Complaint
router.post('/', authenticateToken, validateComplaint, validate, complaintController.addComplaint);

// Get All Complaints (Admin only)
router.get('/all', authenticateToken, authorizeAdmin, complaintController.getAllComplaints);

// Get My Complaints
router.get('/', authenticateToken, complaintController.getMyComplaints);

// Get Complaint by ID
router.get('/:id', authenticateToken, complaintController.getComplaintById);

// Update Complaint Status
router.put('/:id', authenticateToken, complaintController.updateComplaintStatus);

// Search by Location
router.get('/search/location', authenticateToken, complaintController.searchByLocation);

// Filter by Category
router.get('/filter/category', authenticateToken, complaintController.filterByCategory);

// Delete Complaint (Admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, complaintController.deleteComplaint);

module.exports = router;
