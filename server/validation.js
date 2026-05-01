import { z } from "zod";

const allowedSources = ["friends", "social", "website", "billboard", "other"];
const allowedCategories = ["offering", "tithe", "missions", "cell", "alms", "building"];

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  password: z.string().min(8).max(100).optional().default(""),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().max(240).optional().default(""),
  dob: z.string().trim().max(30).optional().default(""),
  source: z.enum(allowedSources),
  interests: z.array(z.string().trim().min(1).max(60)).max(10),
  captchaToken: z.string().trim().optional().default(""),
  website: z.string().optional().default(""),
});

export const memberLoginSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  password: z.string().min(8).max(100),
});

export const donationIntentSchema = z.object({
  amount: z.coerce.number().positive().max(50000),
  category: z.enum(allowedCategories),
  payerName: z.string().trim().max(120).optional().default(""),
  payerEmail: z.union([z.string().email(), z.literal("")]).optional().default(""),
  captchaToken: z.string().trim().optional().default(""),
  website: z.string().optional().default(""),
});

export const cellGroupFeedbackSchema = z.object({
  groupName: z.string().trim().min(2).max(120),
  groupLeader: z.string().trim().min(2).max(120),
  attendance: z.coerce.number().int().min(0).max(5000),
  offering: z.coerce.number().min(0).max(1000000),
  meetingTime: z.string().trim().min(2).max(80),
  notes: z.string().trim().max(600).optional().default(""),
  captchaToken: z.string().trim().optional().default(""),
  website: z.string().optional().default(""),
});
