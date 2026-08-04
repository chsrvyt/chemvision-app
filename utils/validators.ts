// ============================================================
// CHEMVISION — Form Validators (Zod Schemas)
// ============================================================

import { z } from "zod";
import { UserRole } from "@/types";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password must be less than 128 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.nativeEnum(UserRole, {
      message: "Please select a role",
    }),
    department: z.string().optional(),
    enrollmentNo: z.string().optional(),
    semester: z.coerce.number().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const subjectSchema = z.object({
  name: z
    .string()
    .min(1, "Subject name is required")
    .max(100, "Subject name must be less than 100 characters"),
  code: z
    .string()
    .min(1, "Subject code is required")
    .max(20, "Subject code must be less than 20 characters"),
  semester: z.coerce
    .number()
    .min(1, "Semester must be at least 1")
    .max(8, "Semester must be at most 8"),
  department: z.string().min(1, "Department is required"),
  description: z.string().optional(),
});

export const practicalSchema = z.object({
  subjectId: z.string().min(1, "Subject is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  practicalNo: z.coerce.number().min(1, "Practical number is required"),
  aim: z.string().min(1, "Aim is required"),
  theory: z.string().min(1, "Theory is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is needed"),
  procedure: z.array(z.string()).min(1, "At least one procedure step is needed"),
  observation: z.string().optional().default(""),
  calculations: z.string().optional().default(""),
  result: z.string().optional().default(""),
  precautions: z.array(z.string()).optional().default([]),
  videoURL: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  teacherNotes: z.string().optional().default(""),
  dueDate: z.string().optional(),
});

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  department: z.string().optional(),
  photoURL: z.string().url().optional().or(z.literal("")),
});

export const announcementSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters"),
  targetRole: z.enum(["admin", "teacher", "student", "all"]),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type SubjectFormValues = z.infer<typeof subjectSchema>;
export type PracticalFormValues = z.infer<typeof practicalSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type AnnouncementFormValues = z.infer<typeof announcementSchema>;
