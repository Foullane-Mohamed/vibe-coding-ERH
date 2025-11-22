import * as z from 'zod'

export const documentSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  type: z.enum(['Lab Report', 'Imaging', 'Prescription', 'Other']),
  description: z.string().min(1, 'Description is required'),
  file: z.any().refine((files) => files?.length === 1, 'File is required'),
})

export type DocumentFormValues = z.infer<typeof documentSchema>
