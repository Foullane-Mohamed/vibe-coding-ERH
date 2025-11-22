import * as z from 'zod'

export const labOrderSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  tests: z.array(z.object({
    name: z.string().min(1, 'Test name is required'),
    code: z.string().optional(),
  })).min(1, 'At least one test is required'),
  priority: z.enum(['routine', 'urgent', 'stat']),
  notes: z.string().optional(),
})

export type LabOrderFormValues = z.infer<typeof labOrderSchema>
