
import { TutorProfile, TuteeProfile, Subject, TutorSession, Resource, Feedback } from "@/types";

// Mock subjects
export const subjects: Subject[] = [
  { id: "1", name: "Mathematics", level: "Intermediate" },
  { id: "2", name: "Physics", level: "Advanced" },
  { id: "3", name: "Computer Science", level: "Beginner" },
  { id: "4", name: "Chemistry", level: "Intermediate" },
  { id: "5", name: "Biology", level: "Advanced" },
  { id: "6", name: "English Literature", level: "Beginner" },
  { id: "7", name: "History", level: "Intermediate" },
  { id: "8", name: "Python Programming", level: "Advanced" },
  { id: "9", name: "Java Programming", level: "Beginner" },
  { id: "10", name: "Web Development", level: "Intermediate" },
];

// Mock tutors
export const tutors: TutorProfile[] = [
  {
    id: "1",
    email: "john.doe@dut.ac.za",
    name: "John Doe",
    role: "tutor",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Mathematics tutor with 3 years of experience. I specialize in calculus and linear algebra.",
    subjects: [subjects[0], subjects[1]],
    qualifications: ["BSc Mathematics", "Tutor Certification"],
    hourlyRate: 150,
    availability: [
      { day: "Monday", startTime: "16:00", endTime: "20:00" },
      { day: "Wednesday", startTime: "15:00", endTime: "19:00" },
      { day: "Saturday", startTime: "10:00", endTime: "15:00" },
    ],
    rating: 4.8,
    reviewCount: 24,
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    email: "jane.smith@dut.ac.za",
    name: "Jane Smith",
    role: "tutor",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Computer Science tutor focusing on Python and Java. I make programming easy to understand for beginners.",
    subjects: [subjects[2], subjects[7], subjects[8]],
    qualifications: ["MSc Computer Science", "Software Developer"],
    hourlyRate: 200,
    availability: [
      { day: "Tuesday", startTime: "17:00", endTime: "21:00" },
      { day: "Thursday", startTime: "16:00", endTime: "20:00" },
      { day: "Sunday", startTime: "12:00", endTime: "18:00" },
    ],
    rating: 4.9,
    reviewCount: 31,
    createdAt: new Date("2022-11-05"),
  },
  {
    id: "3",
    email: "michael.jones@dut.ac.za",
    name: "Michael Jones",
    role: "tutor",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Chemistry and Biology tutor with a passion for making science accessible to everyone.",
    subjects: [subjects[3], subjects[4]],
    qualifications: ["BSc Chemistry", "PhD candidate"],
    hourlyRate: 180,
    availability: [
      { day: "Monday", startTime: "14:00", endTime: "18:00" },
      { day: "Friday", startTime: "16:00", endTime: "20:00" },
      { day: "Saturday", startTime: "09:00", endTime: "13:00" },
    ],
    rating: 4.7,
    reviewCount: 18,
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "4",
    email: "sarah.williams@dut.ac.za",
    name: "Sarah Williams",
    role: "tutor",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "English Literature and History tutor. I help students analyze texts and write compelling essays.",
    subjects: [subjects[5], subjects[6]],
    qualifications: ["MA English Literature", "Teaching Assistant"],
    hourlyRate: 160,
    availability: [
      { day: "Tuesday", startTime: "15:00", endTime: "19:00" },
      { day: "Thursday", startTime: "14:00", endTime: "18:00" },
      { day: "Sunday", startTime: "10:00", endTime: "15:00" },
    ],
    rating: 4.6,
    reviewCount: 15,
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "5",
    email: "david.johnson@dut.ac.za",
    name: "David Johnson",
    role: "tutor",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Web Development and JavaScript expert. I can help you build responsive websites and web applications.",
    subjects: [subjects[9]],
    qualifications: ["BSc Computer Science", "Full Stack Developer"],
    hourlyRate: 220,
    availability: [
      { day: "Wednesday", startTime: "18:00", endTime: "22:00" },
      { day: "Friday", startTime: "15:00", endTime: "19:00" },
      { day: "Saturday", startTime: "14:00", endTime: "18:00" },
    ],
    rating: 4.9,
    reviewCount: 27,
    createdAt: new Date("2023-01-25"),
  },
];

// Mock tutees
export const tutees: TuteeProfile[] = [
  {
    id: "101",
    email: "student1@dut.ac.za",
    name: "Alex Johnson",
    role: "tutee",
    profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "First-year Computer Science student looking for help with Python programming.",
    interests: [subjects[2], subjects[7]],
    learningPreferences: ["Visual learning", "Practical examples"],
    createdAt: new Date("2023-02-10"),
  },
  {
    id: "102",
    email: "student2@dut.ac.za",
    name: "Emily Davis",
    role: "tutee",
    profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Second-year Mathematics student struggling with calculus.",
    interests: [subjects[0]],
    learningPreferences: ["One-on-one sessions", "Problem-solving approach"],
    createdAt: new Date("2023-01-20"),
  },
];

// Mock sessions
export const sessions: TutorSession[] = [
  {
    id: "201",
    tutorId: "1",
    tuteeId: "102",
    subject: subjects[0],
    dateTime: new Date("2023-04-20T16:00:00"),
    duration: 60,
    status: "completed",
    mode: "online",
    meetingLink: "https://zoom.us/j/123456789",
    notes: "Focus on differential equations",
  },
  {
    id: "202",
    tutorId: "2",
    tuteeId: "101",
    subject: subjects[7],
    dateTime: new Date("2023-04-22T17:00:00"),
    duration: 90,
    status: "confirmed",
    mode: "online",
    meetingLink: "https://zoom.us/j/987654321",
    notes: "Review Python fundamentals and OOP concepts",
  },
  {
    id: "203",
    tutorId: "1",
    tuteeId: "102",
    subject: subjects[0],
    dateTime: new Date("2023-04-25T16:00:00"),
    duration: 60,
    status: "requested",
    mode: "in-person",
    notes: "Need help with integration techniques",
  },
];

// Mock resources
export const resources: Resource[] = [
  {
    id: "301",
    title: "Calculus Cheat Sheet",
    description: "A comprehensive guide to calculus formulas and techniques",
    fileUrl: "/resources/calculus-cheatsheet.pdf",
    uploadedBy: "1",
    subject: subjects[0],
    createdAt: new Date("2023-03-15"),
    fileType: "pdf",
    size: 2048000,
  },
  {
    id: "302",
    title: "Python Programming Basics",
    description: "Introduction to Python with code examples",
    fileUrl: "/resources/python-basics.pdf",
    uploadedBy: "2",
    subject: subjects[7],
    createdAt: new Date("2023-03-20"),
    fileType: "pdf",
    size: 1536000,
  },
  {
    id: "303",
    title: "Chemistry Lab Report Template",
    description: "Template for writing chemistry lab reports",
    fileUrl: "/resources/chem-lab-template.docx",
    uploadedBy: "3",
    subject: subjects[3],
    createdAt: new Date("2023-03-25"),
    fileType: "docx",
    size: 512000,
  },
];

// Mock feedback
export const feedback: Feedback[] = [
  {
    id: "401",
    sessionId: "201",
    fromId: "102",
    toId: "1",
    rating: 5,
    comment: "Excellent explanation of differential equations. Very patient and thorough.",
    createdAt: new Date("2023-04-20T17:30:00"),
  },
  {
    id: "402",
    sessionId: "201",
    fromId: "1",
    toId: "102",
    rating: 4,
    comment: "Engaged student, came prepared with questions.",
    createdAt: new Date("2023-04-20T17:35:00"),
  },
];

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
