
import { User, TutorProfile, TuteeProfile, Subject, TutorSession, Resource, Feedback } from "@/types";

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

export const userCredentials: UserCredential[] = [];

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
  userCredentials.push({ email, password, userId });
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
