"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
// Google OAuth routes
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed` }), (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});
// GitHub OAuth routes
router.get('/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport_1.default.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed` }), (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});
// Get current user
router.get('/me', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        return res.json({ user: null });
    }
    res.json({
        user: {
            id: req.user._id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            fullName: `${req.user.firstName} ${req.user.lastName}`,
            avatar: req.user.avatar,
            provider: req.user.provider,
        },
    });
}));
// Logout
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Logout failed' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map