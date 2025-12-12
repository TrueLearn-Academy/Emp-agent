import { z } from 'zod'

// Phone validation (10 digits)
const phoneRegex = /^[6-9]\d{9}$/

// Aadhaar validation (12 digits)
const aadhaarRegex = /^\d{12}$/

// PAN validation (10 characters)
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/

// IFSC validation
const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/

// Step 1: Personal Details
export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  fatherName: z.string().min(2, 'Father name must be at least 2 characters'),
  motherName: z.string().min(2, 'Mother name must be at least 2 characters'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  whatsapp: z.string().regex(phoneRegex, 'Invalid WhatsApp number').optional().or(z.literal('')),
  email: z.string().email('Invalid email address'),
  dob: z.string().min(1, 'Date of birth is required'),
  dateOfJoining: z.string().min(1, 'Date of joining is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  bloodGroup: z.string().optional(),
})

// Step 2: Address Details
export const addressDetailsSchema = z.object({
  permanentAddress: z.string().min(10, 'Address must be at least 10 characters'),
  presentAddress: z.string().min(10, 'Address must be at least 10 characters'),
  state: z.string().min(2, 'Please select a state'),
  district: z.string().min(2, 'Please enter district'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
})

// Step 3: Government IDs
export const governmentIdsSchema = z.object({
  aadhaar: z.string().regex(aadhaarRegex, 'Aadhaar must be 12 digits'),
  pan: z.string().regex(panRegex, 'Invalid PAN format (e.g., ABCDE1234F)'),
  uan: z.string().optional().or(z.literal('')),
  esic: z.string().optional().or(z.literal('')),
})

// Step 4: Education Details
export const educationDetailsSchema = z.object({
  highestQualification: z.string().optional(),
  institution: z.string().optional(),
  yearOfPassing: z.string().optional(),
  percentage: z.string().optional(),
})

// Step 5: Bank Details
export const bankDetailsSchema = z.object({
  bankAccountName: z.string().min(2, 'Account holder name is required'),
  bankName: z.string().min(2, 'Bank name is required'),
  branchName: z.string().min(2, 'Branch name is required'),
  accountNumber: z.string().min(9, 'Account number must be at least 9 digits'),
  ifsc: z.string().regex(ifscRegex, 'Invalid IFSC code format'),
})

// Combined form schema
export const completeEmployeeSchema = personalDetailsSchema
  .merge(addressDetailsSchema)
  .merge(governmentIdsSchema)
  .merge(educationDetailsSchema)
  .merge(bankDetailsSchema)

export type PersonalDetailsType = z.infer<typeof personalDetailsSchema>
export type AddressDetailsType = z.infer<typeof addressDetailsSchema>
export type GovernmentIdsType = z.infer<typeof governmentIdsSchema>
export type EducationDetailsType = z.infer<typeof educationDetailsSchema>
export type BankDetailsType = z.infer<typeof bankDetailsSchema>
export type CompleteEmployeeType = z.infer<typeof completeEmployeeSchema>
