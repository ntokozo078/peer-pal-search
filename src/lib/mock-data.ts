
import { User, TutorProfile, TuteeProfile, Subject, TutorSession, Resource, Feedback, Availability } from "@/types";

// Start with empty arrays for all data collections
export const subjects: Subject[] = [];
export const tutors: TutorProfile[] = [];
export const tutees: TuteeProfile[] = [];
export const sessions: TutorSession[] = [];
export const resources: Resource[] = [];
export const feedback: Feedback[] = [];

// Store user credentials for authentication
interface UserCredential {
  email: string;
  password: string;
  userId: string;
}

export const userCredentials: UserCredential[] = [
  // Add some test users
  {
    email: "test@test.com",
    password: "password",
    userId: "user-test-tutor"
  },
  {
    email: "student@test.com",
    password: "password",
    userId: "user-test-tutee"
  },
  {
    email: "siyemukelakheswa@gmail.com",
    password: "password123",
    userId: "user-siyemukela"
  }
];

// Seed some test users
const testSubjects: Subject[] = [{
  id: "math-101",
  name: "Mathematics",
  level: "Advanced",
  tutorId: "user-test-tutor",
  hourlyRate: 150,
  description: "Advanced mathematics covering calculus, linear algebra, and differential equations."
}, {
  id: "phys-101",
  name: "Physics",
  level: "Intermediate",
  tutorId: "user-test-tutor",
  hourlyRate: 130,
  description: "Intermediate physics covering mechanics, thermodynamics, and electromagnetic theory."
}];

subjects.push(...testSubjects);

const testTutor: TutorProfile = {
  id: "user-test-tutor",
  email: "test@test.com",
  name: "Test Tutor",
  role: "tutor",
  createdAt: new Date(),
  bio: "Experienced tutor in mathematics and physics",
  subjects: subjects.filter(s => s.tutorId === "user-test-tutor"),
  hourlyRate: 150,
  availability: [{
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00"
  }, {
    day: "Wednesday",
    startTime: "09:00",
    endTime: "17:00"
  }, {
    day: "Friday",
    startTime: "09:00",
    endTime: "17:00"
  }],
  rating: 4.8,
  reviewCount: 24,
  qualifications: ["BSc Mathematics", "MSc Physics"],
};

const testTutee: TuteeProfile = {
  id: "user-test-tutee",
  email: "student@test.com",
  name: "Test Student",
  role: "tutee",
  createdAt: new Date(),
  bio: "Engineering student looking for help with math courses",
  educationLevel: "Undergraduate",
  interests: [{
    id: "math-101",
    name: "Mathematics",
    description: "Advanced mathematics",
    level: "Advanced",
    tutorId: "user-test-tutor",
    hourlyRate: 150
  }, {
    id: "eng-101",
    name: "Engineering",
    description: "Engineering principles",
    level: "Intermediate",
    tutorId: "user-test-tutor",
    hourlyRate: 140
  }],
};

const siyemukelaUser: User = {
  id: "user-siyemukela",
  email: "siyemukelakheswa@gmail.com",
  name: "Siyemukela",
  role: "tutee",
  createdAt: new Date(),
  bio: "DUT student",
};

// Add test users to respective arrays
tutors.push(testTutor);
tutees.push(testTutee);
tutees.push(siyemukelaUser as TuteeProfile);

// Combine tutors and tutees for user operations
export const allUsers: User[] = [...tutors, ...tutees];

// Helper functions to find and filter data
export function findUserById(id: string) {
  return allUsers.find(user => user.id === id);
}

export function findUserByEmail(email: string) {
  return allUsers.find(user => user.email === email);
}

export function findUserCredentials(email: string) {
  return userCredentials.find(cred => cred.email === email);
}

export function getTutorSessions(tutorId: string) {
  return sessions.filter(session => session.tutorId === tutorId);
}

export function getTuteeSessions(tuteeId: string) {
  return sessions.filter(session => session.tuteeId === tuteeId);
}

export function getTutorResources(tutorId: string) {
  return resources.filter(resource => resource.uploadedBy === tutorId);
}

export function getSessionFeedback(sessionId: string) {
  return feedback.filter(f => f.sessionId === sessionId);
}

export function getAllSubjects() {
  return subjects;
}

export function getSubjectsByTutor(tutorId: string) {
  return subjects.filter(subject => subject.tutorId === tutorId);
}

export function addUser(user: User) {
  if (user.role === 'tutor') {
    tutors.push(user as TutorProfile);
  } else {
    tutees.push(user as TuteeProfile);
  }
  // Update the allUsers reference
  allUsers.length = 0;
  allUsers.push(...tutors, ...tutees);
  return user;
}

export function addUserCredentials(email: string, password: string, userId: string) {
  // Check if credentials already exist
  const existingCred = userCredentials.find(cred => cred.email === email);
  if (!existingCred) {
    userCredentials.push({ email, password, userId });
  }
}

export function updateUser(updatedUser: User) {
  const index = allUsers.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    // Update in the specific role array
    if (updatedUser.role === 'tutor') {
      const tutorIndex = tutors.findIndex(t => t.id === updatedUser.id);
      if (tutorIndex !== -1) {
        tutors[tutorIndex] = { ...tutors[tutorIndex], ...updatedUser } as TutorProfile;
      }
    } else {
      const tuteeIndex = tutees.findIndex(t => t.id === updatedUser.id);
      if (tuteeIndex !== -1) {
        tutees[tuteeIndex] = { ...tutees[tuteeIndex], ...updatedUser } as TuteeProfile;
      }
    }
    
    // Update in the combined array
    allUsers[index] = updatedUser;
    return true;
  }
  return false;
}

export function addSubject(subject: Subject) {
  subjects.push(subject);
  
  // If the subject is added by a tutor, add it to their profile as well
  const tutorIndex = tutors.findIndex(t => t.id === subject.tutorId);
  if (tutorIndex !== -1) {
    tutors[tutorIndex].subjects.push(subject);
  }
  
  return subject;
}

export function addSession(session: TutorSession) {
  sessions.push(session);
  return session;
}

export function updateSession(sessionId: string, updates: Partial<TutorSession>) {
  const index = sessions.findIndex(s => s.id === sessionId);
  if (index !== -1) {
    sessions[index] = { ...sessions[index], ...updates };
    return true;
  }
  return false;
}

export function addResource(resource: Resource) {
  resources.push(resource);
  return resource;
}

export function addFeedback(feedbackItem: Feedback) {
  feedback.push(feedbackItem);
  return feedbackItem;
}
