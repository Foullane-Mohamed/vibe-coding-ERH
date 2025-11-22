import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import axios from 'axios'

import { consultationSchema, type ConsultationFormValues } from '@/schemas/consultation.schema'

interface Appointment {
  _id: string
  patient: { firstName: string; lastName: string }
  startTime: string
}

const CreateConsultation = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      diagnosis: [{ code: '', description: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "diagnosis"
  })

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token')
        // In a real app, we'd filter for appointments that are 'scheduled' and assigned to this doctor
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/appointments`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setAppointments(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchAppointments()
  }, [])

  const onSubmit = async (data: ConsultationFormValues) => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/consultations`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/consultations')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create consultation')
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Consultation</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <FormSelect 
          name="appointmentId" 
          control={control} 
          label="Appointment" 
          options={appointments.map(a => ({ 
            label: `${a.patient.firstName} ${a.patient.lastName} - ${new Date(a.startTime).toLocaleString()}`, 
            value: a._id 
          }))}
          placeholder="Select Appointment"
          error={errors.appointmentId?.message}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Vitals</h3>
          <div className="grid grid-cols-4 gap-4">
            <FormInput label="Height (cm)" {...register('vitals.height')} error={errors.vitals?.height?.message} />
            <FormInput label="Weight (kg)" {...register('vitals.weight')} error={errors.vitals?.weight?.message} />
            <FormInput label="BP (mmHg)" placeholder="120/80" {...register('vitals.bloodPressure')} error={errors.vitals?.bloodPressure?.message} />
            <FormInput label="Temp (°C)" {...register('vitals.temperature')} error={errors.vitals?.temperature?.message} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Diagnosis</h3>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ code: '', description: '' })}>
              Add Diagnosis
            </Button>
          </div>
          
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end">
              <div className="flex-1">
                <FormInput 
                  label={index === 0 ? "Code" : ""} 
                  {...register(`diagnosis.${index}.code`)} 
                  error={errors.diagnosis?.[index]?.code?.message} 
                />
              </div>
              <div className="flex-[2]">
                <FormInput 
                  label={index === 0 ? "Description" : ""} 
                  {...register(`diagnosis.${index}.description`)} 
                  error={errors.diagnosis?.[index]?.description?.message} 
                />
              </div>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                X
              </Button>
            </div>
          ))}
          {errors.diagnosis?.message && <p className="text-sm text-red-500">{errors.diagnosis.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register('notes')}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate('/consultations')}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Consultation'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateConsultation
