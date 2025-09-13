"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthOptional = exports.requireAuth = void 0;
const errorHandler_1 = require("./errorHandler");
const requireAuth = (req, res, next) => {
    if (!req.user) {
        throw (0, errorHandler_1.createError)('Authentication required', 401);
    }
    next();
};
exports.requireAuth = requireAuth;
const requireAuthOptional = (req, res, next) => {
    // User may or may not be authenticated - just pass through
    next();
};
exports.requireAuthOptional = requireAuthOptional;
//# sourceMappingURL=auth.js.map