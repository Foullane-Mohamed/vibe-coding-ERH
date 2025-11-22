import * as z from 'zod'

export const consultationSchema = z.object({
  appointmentId: z.string().min(1, 'Appointment is required'),
  vitals: z.object({
    height: z.string().optional(),
    weight: z.string().optional(),
    bloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, 'Invalid format (e.g. 120/80)').optional().or(z.literal('')),
    temperature: z.string().optional(),
  }),
  diagnosis: z.array(z.object({
    code: z.string().min(1, 'Code is required'),
    description: z.string().min(1, 'Description is required'),
  })).min(1, 'At least one diagnosis is required'),
  notes: z.string().optional(),
})

export type ConsultationFormValues = z.infer<typeof consultationSchema>
