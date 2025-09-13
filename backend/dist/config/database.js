"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-application-copilot';
        await mongoose_1.default.connect(mongoURI);
        console.log('✅ Connected to MongoDB');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
};
exports.connectDB = connectDB;
// Handle connection events
mongoose_1.default.connection.on('disconnected', () => {
    console.log('🔌 Disconnected from MongoDB');
});
mongoose_1.default.connection.on('error', (error) => {
    console.error('❌ MongoDB error:', error);
});
// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('🔌 MongoDB connection closed through app termination');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error during MongoDB disconnection:', error);
        process.exit(1);
    }
});
//# sourceMappingURL=database.js.map