import * as z from 'zod'

export const prescriptionSchema = z.object({
  consultationId: z.string().min(1, 'Consultation is required'),
  medications: z.array(z.object({
    name: z.string().min(1, 'Medication name is required'),
    dosage: z.string().min(1, 'Dosage is required'),
    frequency: z.string().min(1, 'Frequency is required'),
    duration: z.string().min(1, 'Duration is required'),
    instructions: z.string().optional(),
  })).min(1, 'At least one medication is required'),
  notes: z.string().optional(),
})

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>
