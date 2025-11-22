import * as z from 'zod'

export const appointmentSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  doctorId: z.string().min(1, 'Doctor is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  type: z.enum(['Consultation', 'Follow-up', 'Routine Checkup', 'Emergency']),
  reason: z.string().min(1, 'Reason is required'),
})

export type AppointmentFormValues = z.infer<typeof appointmentSchema>
