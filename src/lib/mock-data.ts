
import { TutorProfile, TuteeProfile, Subject, TutorSession, Resource, Feedback } from "@/types";

// Initial empty arrays for data that will be populated by real users
export const subjects: Subject[] = [];
export const tutors: TutorProfile[] = [];
export const tutees: TuteeProfile[] = [];
export const sessions: TutorSession[] = [];
export const resources: Resource[] = [];
export const feedback: Feedback[] = [];

export const allUsers = [...tutors, ...tutees];

export function findUserById(id: string) {
  return allUsers.find(user => user.id === id);
}

export function findUserByEmail(email: string) {
  return allUsers.find(user => user.email === email);
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
