"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
// Get user profile
router.get('/profile', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const user = await User_1.User.findById(req.user._id);
    if (!user) {
        throw (0, errorHandler_1.createError)('User not found', 404);
    }
    res.json({
        success: true,
        data: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            avatar: user.avatar,
            provider: user.provider,
            profile: user.profile,
            jobPreferences: user.jobPreferences,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
    });
}));
// Update user profile
router.put('/profile', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { profile, jobPreferences } = req.body;
    const user = await User_1.User.findByIdAndUpdate(req.user._id, {
        ...(profile && { profile: { ...req.user.profile, ...profile } }),
        ...(jobPreferences && { jobPreferences: { ...req.user.jobPreferences, ...jobPreferences } }),
    }, { new: true, runValidators: true });
    if (!user) {
        throw (0, errorHandler_1.createError)('User not found', 404);
    }
    res.json({
        success: true,
        data: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            avatar: user.avatar,
            provider: user.provider,
            profile: user.profile,
            jobPreferences: user.jobPreferences,
            updatedAt: user.updatedAt,
        },
    });
}));
// Update basic user info
router.put('/info', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        throw (0, errorHandler_1.createError)('First name and last name are required', 400);
    }
    const user = await User_1.User.findByIdAndUpdate(req.user._id, { firstName, lastName }, { new: true, runValidators: true });
    if (!user) {
        throw (0, errorHandler_1.createError)('User not found', 404);
    }
    res.json({
        success: true,
        data: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            updatedAt: user.updatedAt,
        },
    });
}));
exports.default = router;
//# sourceMappingURL=user.js.map