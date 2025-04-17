
export type UserRole = "tutor" | "tutee";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profilePicture?: string;
  bio?: string;
  createdAt: Date;
}

export interface TutorProfile extends User {
  role: "tutor";
  subjects: Subject[];
  qualifications: string[];
  hourlyRate: number;
  availability: Availability[];
  rating: number;
  reviewCount: number;
}

export interface TuteeProfile extends User {
  role: "tutee";
  interests: Subject[];
  learningPreferences?: string[];
  sessionHistory?: TutorSession[];
}

export interface Subject {
  id: string;
  name: string;
  level: string; // e.g., "Beginner", "Intermediate", "Advanced"
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}

export interface TutorSession {
  id: string;
  tutorId: string;
  tuteeId: string;
  subject: Subject;
  dateTime: Date;
  duration: number; // in minutes
  status: "requested" | "confirmed" | "completed" | "cancelled";
  mode: "online" | "in-person";
  notes?: string;
  meetingLink?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  uploadedBy: string;
  subject: Subject;
  createdAt: Date;
  fileType: string;
  size: number; // in bytes
}

export interface Feedback {
  id: string;
  sessionId: string;
  fromId: string;
  toId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

export interface SearchQuery {
  text: string;
  subject?: string;
  availability?: {
    day?: string;
    time?: string;
  };
  level?: string;
  mode?: "online" | "in-person";
}
