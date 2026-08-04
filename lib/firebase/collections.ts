// ============================================================
// CHEMVISION — Firestore Collection References
// ============================================================

import { collection, CollectionReference, DocumentData } from "firebase/firestore";
import { db } from "./config";

// Collection names as constants to prevent typos
export const COLLECTIONS = {
  USERS: "users",
  TEACHERS: "teachers",
  STUDENTS: "students",
  SUBJECTS: "subjects",
  PRACTICALS: "practicals",
  SUBMISSIONS: "submissions",
  MARKS: "marks",
  REPORTS: "reports",
  NOTIFICATIONS: "notifications",
  ANNOUNCEMENTS: "announcements",
  ATTENDANCE: "attendance",
} as const;

// Type-safe collection references
export const usersCollection = collection(db, COLLECTIONS.USERS) as CollectionReference<DocumentData>;
export const teachersCollection = collection(db, COLLECTIONS.TEACHERS) as CollectionReference<DocumentData>;
export const studentsCollection = collection(db, COLLECTIONS.STUDENTS) as CollectionReference<DocumentData>;
export const subjectsCollection = collection(db, COLLECTIONS.SUBJECTS) as CollectionReference<DocumentData>;
export const practicalsCollection = collection(db, COLLECTIONS.PRACTICALS) as CollectionReference<DocumentData>;
export const submissionsCollection = collection(db, COLLECTIONS.SUBMISSIONS) as CollectionReference<DocumentData>;
export const marksCollection = collection(db, COLLECTIONS.MARKS) as CollectionReference<DocumentData>;
export const reportsCollection = collection(db, COLLECTIONS.REPORTS) as CollectionReference<DocumentData>;
export const notificationsCollection = collection(db, COLLECTIONS.NOTIFICATIONS) as CollectionReference<DocumentData>;
export const announcementsCollection = collection(db, COLLECTIONS.ANNOUNCEMENTS) as CollectionReference<DocumentData>;
export const attendanceCollection = collection(db, COLLECTIONS.ATTENDANCE) as CollectionReference<DocumentData>;
