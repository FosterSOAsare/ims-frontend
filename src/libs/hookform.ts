import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
});

export const resetPasswordSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
});

export const setPasswordSchema = z.object({
  password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
  confirmpassword: z.string().min(1, { message: "Please confirm your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
});

export const registerSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  name: z.string().min(1, { message: "Please enter your fullname" }).min(3, { message: 'Full name should not be less than 3 characters' }),
  password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Passwords must be at least 8 characters in length' }),
  phone: z.string().min(1, { message: "Please enter your phone number" }).regex(/^[0-9]{9,12}$/, { message: 'Please enter a valid phone number' })
});