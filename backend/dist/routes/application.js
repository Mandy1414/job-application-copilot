"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JobApplication_1 = require("../models/JobApplication");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
// Get all applications for user
router.get('/', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { status, page = 1, limit = 10, sortBy = 'updatedAt', sortOrder = 'desc' } = req.query;
    const filter = { userId: req.user._id };
    if (status) {
        filter.status = status;
    }
    const applications = await JobApplication_1.JobApplication.find(filter)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
    const total = await JobApplication_1.JobApplication.countDocuments(filter);
    res.json({
        success: true,
        data: applications,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / Number(limit)),
        },
    });
}));
// Get application by ID
router.get('/:id', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const application = await JobApplication_1.JobApplication.findOne({
        _id: req.params.id,
        userId: req.user._id,
    });
    if (!application) {
        throw (0, errorHandler_1.createError)('Application not found', 404);
    }
    res.json({
        success: true,
        data: application,
    });
}));
// Create new application
router.post('/', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const applicationData = {
        ...req.body,
        userId: req.user._id,
    };
    const application = new JobApplication_1.JobApplication(applicationData);
    await application.save();
    res.status(201).json({
        success: true,
        data: application,
    });
}));
// Update application
router.put('/:id', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const application = await JobApplication_1.JobApplication.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true, runValidators: true });
    if (!application) {
        throw (0, errorHandler_1.createError)('Application not found', 404);
    }
    res.json({
        success: true,
        data: application,
    });
}));
// Delete application
router.delete('/:id', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const application = await JobApplication_1.JobApplication.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
    });
    if (!application) {
        throw (0, errorHandler_1.createError)('Application not found', 404);
    }
    res.json({
        success: true,
        message: 'Application deleted successfully',
    });
}));
// Get application statistics
router.get('/stats/overview', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user._id;
    const totalApplications = await JobApplication_1.JobApplication.countDocuments({ userId });
    const appliedCount = await JobApplication_1.JobApplication.countDocuments({ userId, status: 'applied' });
    const interviewCount = await JobApplication_1.JobApplication.countDocuments({ userId, status: 'interview' });
    const offerCount = await JobApplication_1.JobApplication.countDocuments({ userId, status: 'offer' });
    const rejectedCount = await JobApplication_1.JobApplication.countDocuments({ userId, status: 'rejected' });
    const statusBreakdown = await JobApplication_1.JobApplication.aggregate([
        { $match: { userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const monthlyApplications = await JobApplication_1.JobApplication.aggregate([
        { $match: { userId, appliedDate: { $exists: true } } },
        {
            $group: {
                _id: {
                    year: { $year: '$appliedDate' },
                    month: { $month: '$appliedDate' },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);
    res.json({
        success: true,
        data: {
            summary: {
                total: totalApplications,
                applied: appliedCount,
                interviews: interviewCount,
                offers: offerCount,
                rejected: rejectedCount,
            },
            statusBreakdown,
            monthlyApplications,
        },
    });
}));
exports.default = router;
//# sourceMappingURL=application.js.map