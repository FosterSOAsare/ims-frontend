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

export const newDrugStep1Schema = z.object({
  name: z.string().min(1, { message: "Please enter the name of the drug" }).min(3, { message: 'Name should not be less than 3 characters' }),
  brand: z.string().min(1, { message: "Please enter the brand of the drug" }).min(3, { message: 'Brand name should not be less than 3 characters' }),
  code: z.string().min(1, { message: "Please enter the code of the drug" }).min(3, { message: 'Code should not be less than 3 characters' }),
});

export const newDrugStep2Schema = z.object({
  batchNo: z.string().min(1, { message: "Please enter the batch number of the drug" }).min(3, { message: 'Batch number should not be less than 3 characters' }),
  reorderLevel: z.string().min(1, { message: "Please enter the reorder level of the drug" }),
  expDate: z.string().min(1, { message: "Please enter the expiry date of the drug" }),
  quantity: z.string().min(1, { message: "Please enter the quantity at hand" }).regex(/^[0-9]{1,}$/, { message: 'Please enter a valid quantity. Numbers only' }),
  costPrice: z.string().min(1, { message: "Please enter the cost price of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid cost price. Numbers only' }),
  sellingPrice: z.string().min(1, { message: "Please enter the selling price of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid selling price. Numbers only' })
});

export const stockAdjustmentSchema = z.object({
  currentStock: z.string().min(1, { message: "Please enter the current stock of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid cost price. Numbers only' }),
  actualStock: z.string().min(1, { message: "Please enter the actual stock of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid quantity. Numbers only' }),
  notes: z.string().min(1, { message: "Please add a note to the adjustment" }),
});


export const drugOrderSchema = z.object({
  quantity: z.string().min(1, { message: "Please enter the current stock of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid cost price. Numbers only' }),
  // orderNo: z.string().min(1, { message: "Please enter the order number of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid quantity. Numbers only' }),
  deliveryDate: z.string().min(1, { message: "Please add an expected delivery date to the order" }),
  address: z.string().min(1, { message: "Please add your address for delivery" }),
});