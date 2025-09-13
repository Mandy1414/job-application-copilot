import mongoose, { Document, Schema } from 'mongoose';

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
    jobTypes?: string[]; // full-time, part-time, contract, remote
    industries?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['google', 'github'],
      required: true,
    },
    googleId: {
      type: String,
      sparse: true,
    },
    githubId: {
      type: String,
      sparse: true,
    },
    profile: {
      phone: String,
      location: String,
      bio: String,
      website: String,
      linkedIn: String,
      github: String,
      skills: [String],
      experience: String,
    },
    jobPreferences: {
      jobTitles: [String],
      locations: [String],
      salaryRange: {
        min: Number,
        max: Number,
        currency: {
          type: String,
          default: 'USD',
        },
      },
      jobTypes: [String],
      industries: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ githubId: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
  virtuals: true,
});

export const User = mongoose.model<IUser>('User', userSchema);