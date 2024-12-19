import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$^&*()_-])[a-zA-Z\d.,!@#$^&*()_-]{8,32}$/, { message: 'Password must be between 8 and 32 characters long with at least 1 special character and an uppercase character' }),
});

export const resetPasswordSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
});

export const setPasswordSchema = z.object({
  password: z.string().min(1, { message: "Please enter your password" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$^&*()_-])[a-zA-Z\d.,!@#$^&*()_-]{8,32}$/, { message: 'Password must be between 8 and 32 characters long with at least 1 special character and an uppercase character' }),
  confirmpassword: z.string().min(1, { message: "Please confirm your password" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$^&*()_-])[a-zA-Z\d.,!@#$^&*()_-]{8,32}$/, { message: 'Password must be between 8 and 32 characters long with at least 1 special character and an uppercase character' }),
});

export const registerSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  name: z.string().min(1, { message: "Please enter your fullname" }).min(3, { message: 'Full name should not be less than 3 characters' }),
  password: z.string().min(1, { message: "Please enter your password" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$^&*()_-])[a-zA-Z\d.,!@#$^&*()_-]{8,32}$/, { message: 'Password must be between 8 and 32 characters long with at least 1 special character and an uppercase character' }),
  phone: z.string().min(1, { message: "Please enter your phone number" }).regex(/^[0-9]{9,12}$/, { message: 'Please enter a valid phone number' })
});

export const newDrugStep1Schema = z.object({
  name: z.string().min(1, { message: "Please enter the name of the drug" }).min(3, { message: 'Name should not be less than 3 characters' }),
  brandName: z.string().min(1, { message: "Please enter the brand of the drug" }).min(3, { message: 'Brand name should not be less than 3 characters' }),
  code: z.string().min(1, { message: "Please enter the code of the drug" }).min(3, { message: 'Code should not be less than 3 characters' }),
  manufacturer: z.string().min(1, { message: "Please enter the name of the maunfacturer" }).min(3, { message: 'Manufacturer name should not be less than 3 characters' }),
  fdaApproval: z.string().min(1, { message: "Please enter the fda approval number of drug" }).min(3, { message: 'FDA Approval number should not be less than 3 characters' }),
  iso: z.string().min(1, { message: "Please enter the iso of drug" }).min(3, { message: 'ISO should not be less than 3 characters' }),
  strength: z.string().min(1, { message: "Please enter the strength of the drug" }),
});

export const newDrugStep2Schema = z.object({
  reorderPoint: z.string().min(1, { message: "Please enter the reorder level of the drug" }),
  costPrice: z.string().min(1, { message: "Please enter the cost price of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid cost price. Numbers only' }),
  sellingPrice: z.string().min(1, { message: "Please enter the selling price of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid selling price. Numbers only' }),
  storageReq: z.string().min(1, { message: "Please enter the storage requirements of the drug" }),
});

export const stockAdjustmentSchema = z.object({
  currentStock: z.string().min(1, { message: "Please enter the current stock of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid cost price. Numbers only' }),
  actualStock: z.string().min(1, { message: "Please enter the actual stock of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid quantity. Numbers only' }),
  notes: z.string().min(1, { message: "Please add a note to the adjustment" }),
});


export const drugOrderSchema = z.object({
  quantity: z.string().min(1, { message: "Please enter the current stock of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid quantity. Numbers only' }),
  // orderNo: z.string().min(1, { message: "Please enter the order number of the drug" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid quantity. Numbers only' }),
  deliveryDate: z.string().min(1, { message: "Please add an expected delivery date to the order" }),
  deliveryAddress: z.string().min(1, { message: "Please add your address for delivery" }),
});

export const newUserSchema = z.object({
  name: z.string().min(1, { message: "Please enter fullname" }).min(3, { message: 'Full name should not be less than 3 characters' }),
  email: z.string().min(1, { message: "Please enter email address" }).email({ message: "Please enter a valid email address" }),
});

export const newSupplierStep1Schema = z.object({
  name: z.string().min(1, { message: "Please enter the name of the supplier" }).min(3, { message: 'Name of supplier should not be less than 3 characters' }),
  brandTradeName: z.string(),
  minimumOrderQuantity: z.string().min(1, { message: "Please enter the min order quantity" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid quantity. Numbers only' }),
  leadTime: z.string().min(1, { message: "Please enter the lead time in days" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid lead time. Numbers only' }),
});

export const newSupplierStep2Schema = z.object({
  primaryContactName: z.string().min(1, { message: "Please enter the name of the supplier's primary contact" }).min(3, { message: 'Name of supplier\'s primary contact should not be less than 3 characters' }),
  jobTitle: z.string().min(1, { message: "Please enter the job title of the primary contact of the supplier" }).min(3, { message: 'Job title should not be less than 3 characters' }),
  department: z.string().min(1, { message: "Please enter the department of primary contact" }),
  phoneNumber: z.string().min(1, { message: "Please enter contact's phone number" }).regex(/^[0-9]{9,12}$/, { message: 'Please enter a valid phone number' }),
  email: z.string().min(1, { message: "Please enter contact's email address" }).email({ message: "Please enter a valid email address" }),
  physicalAddress: z.string().min(1, { message: "Please enter the physical address of the contact" }).min(3, { message: 'Physical address should not be less than 3 characters' }),
  mailingAddress: z.string(),
  emergencyContactName: z.string().optional().refine((value) => value === undefined || value === "" || value.length > 3, { message: 'Name of supplier\'s emergency contact should not be less than 3 characters' }),
  emergencyContactTitle: z.string().optional().refine((value) => value === undefined || value === "" || value.length > 3, { message: 'Job title should not be less than 3 characters' }),
  emergencyContactNumber: z.string().optional().refine((value) => value === undefined || value === "" || /^[0-9]{9,12}$/.test(value), { message: 'Please enter a valid phone number for emergency contact' }),
});

export const newSupplierStep3Schema = z.object({
  bankName: z.string(),
  phone: z.string(),
  accountNumber: z.string(),
  minOrderQuantity: z.string().min(1, { message: "Please enter the min order quantity" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid quantity. Numbers only' }),
});