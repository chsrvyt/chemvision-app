// ============================================================
// CHEMVISION — Type Definitions
// ============================================================

import { Timestamp } from "firebase/firestore";

// ── Enums ────────────────────────────────────────────────────

export enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
}

export enum SubmissionStatus {
  PENDING = "pending",
  SUBMITTED = "submitted",
  EVALUATED = "evaluated",
  RETURNED = "returned",
}

export enum NotificationType {
  INFO = "info",
  WARNING = "warning",
  SUCCESS = "success",
  ASSIGNMENT = "assignment",
  EVALUATION = "evaluation",
  ANNOUNCEMENT = "announcement",
}

// ── Base Types ───────────────────────────────────────────────

export interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

// ── User ─────────────────────────────────────────────────────

export interface User extends BaseDocument {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  isActive: boolean;
}

// ── Teacher ──────────────────────────────────────────────────

export interface Teacher extends BaseDocument {
  uid: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  photoURL?: string;
  isActive: boolean;
}

// ── Student ──────────────────────────────────────────────────

export interface Student extends BaseDocument {
  uid: string;
  name: string;
  email: string;
  enrollmentNo: string;
  semester: number;
  department: string;
  subjects: string[];
  photoURL?: string;
  isActive: boolean;
}

// ── Subject ──────────────────────────────────────────────────

export interface Subject extends BaseDocument {
  name: string;
  code: string;
  semester: number;
  department: string;
  teacherId: string;
  teacherName: string;
  description?: string;
  isActive: boolean;
}

// ── Practical ────────────────────────────────────────────────

export interface Practical extends BaseDocument {
  subjectId: string;
  subjectName: string;
  title: string;
  practicalNo: number;
  aim: string;
  theory: string;
  requirements: string[];
  procedure: string[];
  observation: string;
  calculations: string;
  result: string;
  precautions: string[];
  videoURL?: string;
  pdfURL?: string;
  teacherNotes?: string;
  createdBy: string;
  assignedTo: string[];
  dueDate?: Timestamp;
  isPublished: boolean;
}

// ── Submission ───────────────────────────────────────────────

export interface Submission extends BaseDocument {
  practicalId: string;
  practicalTitle: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  content: string;
  fileURLs: string[];
  observations: string;
  calculations: string;
  result: string;
  submittedAt: Timestamp;
  status: SubmissionStatus;
  marks?: number;
  totalMarks?: number;
  remarks?: string;
  evaluatedBy?: string;
  evaluatedAt?: Timestamp;
}

// ── Marks ────────────────────────────────────────────────────

export interface Marks extends BaseDocument {
  studentId: string;
  studentName: string;
  practicalId: string;
  practicalTitle: string;
  subjectId: string;
  subjectName: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  remarks?: string;
  gradedBy: string;
  gradedAt: Timestamp;
}

// ── Report ───────────────────────────────────────────────────

export interface Report extends BaseDocument {
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  semester: number;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  practicalCount: number;
  completedCount: number;
  generatedAt: Timestamp;
}

// ── Notification ─────────────────────────────────────────────

export interface Notification extends BaseDocument {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  actionURL?: string;
}

// ── Announcement ─────────────────────────────────────────────

export interface Announcement extends BaseDocument {
  title: string;
  message: string;
  targetRole: UserRole | "all";
  createdBy: string;
  createdByName: string;
  isActive: boolean;
  expiresAt?: Timestamp;
}

// ── Attendance ───────────────────────────────────────────────

export interface Attendance extends BaseDocument {
  subjectId: string;
  date: Timestamp;
  teacherId: string;
  records: AttendanceRecord[];
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  present: boolean;
}

// ── Navigation ───────────────────────────────────────────────

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

// ── Dashboard Stats ──────────────────────────────────────────

export interface DashboardStat {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
}

// ── API Response ─────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ── Form Types ───────────────────────────────────────────────

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  department?: string;
  enrollmentNo?: string;
  semester?: number;
}

export interface PracticalFormData {
  subjectId: string;
  title: string;
  practicalNo: number;
  aim: string;
  theory: string;
  requirements: string[];
  procedure: string[];
  observation: string;
  calculations: string;
  result: string;
  precautions: string[];
  videoURL?: string;
  teacherNotes?: string;
  dueDate?: string;
}

export interface SubjectFormData {
  name: string;
  code: string;
  semester: number;
  department: string;
  description?: string;
}
