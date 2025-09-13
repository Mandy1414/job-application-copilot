import mongoose, { Document, Schema } from 'mongoose';

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
  jobType?: string; // full-time, part-time, contract, remote
  source?: string; // linkedin, indeed, company-website, etc.
  appliedDate?: Date;
  deadline?: Date;
  notes?: string;
  documents?: {
    resume?: string; // file path or URL
    coverLetter?: string; // file path or URL
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
    type: string; // phone, video, onsite, technical
    date: Date;
    interviewer?: string;
    notes?: string;
    feedback?: string;
  }>;
  followUps?: Array<{
    date: Date;
    type: string; // email, phone, linkedin
    notes?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const jobApplicationSchema = new Schema<IJobApplication>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Indexes
jobApplicationSchema.index({ userId: 1 });
jobApplicationSchema.index({ status: 1 });
jobApplicationSchema.index({ appliedDate: -1 });
jobApplicationSchema.index({ deadline: 1 });

export const JobApplication = mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema);