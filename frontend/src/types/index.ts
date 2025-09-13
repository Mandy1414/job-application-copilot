export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  provider: 'google' | 'github';
  profile?: UserProfile;
  jobPreferences?: JobPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  phone?: string;
  location?: string;
  bio?: string;
  website?: string;
  linkedIn?: string;
  github?: string;
  skills?: string[];
  experience?: string;
}

export interface JobPreferences {
  jobTitles?: string[];
  locations?: string[];
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  jobTypes?: string[];
  industries?: string[];
}

export interface JobApplication {
  _id: string;
  userId: string;
  jobTitle: string;
  company: string;
  jobDescription?: string;
  applicationUrl?: string;
  status: ApplicationStatus;
  priority: Priority;
  salary?: SalaryRange;
  location?: string;
  jobType?: string;
  source?: string;
  appliedDate?: string;
  deadline?: string;
  notes?: string;
  documents?: ApplicationDocuments;
  contacts?: ApplicationContacts;
  interviews?: Interview[];
  followUps?: FollowUp[];
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 'draft' | 'applied' | 'interview' | 'rejected' | 'offer' | 'accepted';

export type Priority = 'low' | 'medium' | 'high';

export interface SalaryRange {
  min?: number;
  max?: number;
  currency?: string;
}

export interface ApplicationDocuments {
  resume?: string;
  coverLetter?: string;
  additionalDocs?: string[];
}

export interface ApplicationContacts {
  recruiterName?: string;
  recruiterEmail?: string;
  recruiterPhone?: string;
  hiringManagerName?: string;
  hiringManagerEmail?: string;
}

export interface Interview {
  type: string;
  date: string;
  interviewer?: string;
  notes?: string;
  feedback?: string;
}

export interface FollowUp {
  date: string;
  type: string;
  notes?: string;
}

export interface ApplicationStats {
  summary: {
    total: number;
    applied: number;
    interviews: number;
    offers: number;
    rejected: number;
  };
  statusBreakdown: Array<{
    _id: ApplicationStatus;
    count: number;
  }>;
  monthlyApplications: Array<{
    _id: {
      year: number;
      month: number;
    };
    count: number;
  }>;
}

export interface ResumeContent {
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    achievements: string[];
  }>;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

export interface CoverLetterContent {
  content: string;
}

export interface KeywordAnalysis {
  keywords: string[];
  suggestions: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}