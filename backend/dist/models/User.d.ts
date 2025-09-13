import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    provider: 'google' | 'github';
    googleId?: string;
    githubId?: string;
    profile?: {
        phone?: string;
        location?: string;
        bio?: string;
        website?: string;
        linkedIn?: string;
        github?: string;
        skills?: string[];
        experience?: string;
    };
    jobPreferences?: {
        jobTitles?: string[];
        locations?: string[];
        salaryRange?: {
            min?: number;
            max?: number;
            currency?: string;
        };
        jobTypes?: string[];
        industries?: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map