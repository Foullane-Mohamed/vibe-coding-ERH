import * as z from 'zod'

export const patientSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number is required'),
  dateOfBirth: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: 'Valid date of birth is required',
  }),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
  }),
  emergencyContact: z.object({
    name: z.string().min(1, 'Contact name is required'),
    phone: z.string().min(10, 'Contact phone is required'),
    relation: z.string().min(1, 'Relation is required'),
  }),
})

export type PatientFormValues = z.infer<typeof patientSchema>
