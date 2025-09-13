"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplication = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const jobApplicationSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    jobTitle: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    jobDescription: String,
    applicationUrl: String,
    status: {
        type: String,
        enum: ['draft', 'applied', 'interview', 'rejected', 'offer', 'accepted'],
        default: 'draft',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    salary: {
        min: Number,
        max: Number,
        currency: {
            type: String,
            default: 'USD',
        },
    },
    location: String,
    jobType: String,
    source: String,
    appliedDate: Date,
    deadline: Date,
    notes: String,
    documents: {
        resume: String,
        coverLetter: String,
        additionalDocs: [String],
    },
    contacts: {
        recruiterName: String,
        recruiterEmail: String,
        recruiterPhone: String,
        hiringManagerName: String,
        hiringManagerEmail: String,
    },
    interviews: [
        {
            type: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            interviewer: String,
            notes: String,
            feedback: String,
        },
    ],
    followUps: [
        {
            date: {
                type: Date,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            notes: String,
        },
    ],
}, {
    timestamps: true,
});
// Indexes
jobApplicationSchema.index({ userId: 1 });
jobApplicationSchema.index({ status: 1 });
jobApplicationSchema.index({ appliedDate: -1 });
jobApplicationSchema.index({ deadline: 1 });
exports.JobApplication = mongoose_1.default.model('JobApplication', jobApplicationSchema);
//# sourceMappingURL=JobApplication.js.map