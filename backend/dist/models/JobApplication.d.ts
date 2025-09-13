import mongoose, { Document } from 'mongoose';
export interface IJobApplication extends Document {
    _id: string;
    userId: string;
    jobTitle: string;
    company: string;
    jobDescription?: string;
    applicationUrl?: string;
    status: 'draft' | 'applied' | 'interview' | 'rejected' | 'offer' | 'accepted';
    priority: 'low' | 'medium' | 'high';
    salary?: {
        min?: number;
        max?: number;
        currency?: string;
    };
    location?: string;
    jobType?: string;
    source?: string;
    appliedDate?: Date;
    deadline?: Date;
    notes?: string;
    documents?: {
        resume?: string;
        coverLetter?: string;
        additionalDocs?: string[];
    };
    contacts?: {
        recruiterName?: string;
        recruiterEmail?: string;
        recruiterPhone?: string;
        hiringManagerName?: string;
        hiringManagerEmail?: string;
    };
    interviews?: Array<{
        type: string;
        date: Date;
        interviewer?: string;
        notes?: string;
        feedback?: string;
    }>;
    followUps?: Array<{
        date: Date;
        type: string;
        notes?: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
export declare const JobApplication: mongoose.Model<IJobApplication, {}, {}, {}, mongoose.Document<unknown, {}, IJobApplication, {}, {}> & IJobApplication & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=JobApplication.d.ts.map