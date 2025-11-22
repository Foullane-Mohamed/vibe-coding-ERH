import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import axios from 'axios'

import { appointmentSchema, type AppointmentFormValues } from '@/schemas/appointment.schema'

interface Patient {
  _id: string
  firstName: string
  lastName: string
}

interface Doctor {
  _id: string
  firstName: string
  lastName: string
}

const CreateAppointment = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([]) // In a real app, we'd fetch doctors
  
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      type: 'Consultation',
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const patientsRes = await axios.get(`${import.meta.env.VITE_API_URL}/patients`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPatients(patientsRes.data)
        
        // Mock doctors for now since we don't have a doctors endpoint yet
        // In a real app, we would fetch users with role='doctor'
        setDoctors([
          { _id: '655e0d3f9f1b2c001c8e4d1a', firstName: 'John', lastName: 'Doe' }, // Example ID
          { _id: '655e0d3f9f1b2c001c8e4d1b', firstName: 'Jane', lastName: 'Smith' },
        ])
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      
      // Combine date and time
      const startDateTime = new Date(`${data.date}T${data.startTime}`)
      const endDateTime = new Date(`${data.date}T${data.endTime}`)

      await axios.post(`${import.meta.env.VITE_API_URL}/appointments`, {
        patientId: data.patientId,
        doctorId: data.doctorId,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        type: data.type,
        reason: data.reason,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/appointments')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to schedule appointment')
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule Appointment</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          <FormSelect 
            name="patientId" 
            control={control} 
            label="Patient" 
            options={patients.map(p => ({ label: `${p.firstName} ${p.lastName}`, value: p._id }))}
            placeholder="Select Patient"
            error={errors.patientId?.message}
          />
          <FormSelect 
            name="doctorId" 
            control={control} 
            label="Doctor" 
            options={doctors.map(d => ({ label: `Dr. ${d.firstName} ${d.lastName}`, value: d._id }))}
            placeholder="Select Doctor"
            error={errors.doctorId?.message}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormInput label="Date" type="date" {...register('date')} error={errors.date?.message} />
          <FormInput label="Start Time" type="time" {...register('startTime')} error={errors.startTime?.message} />
          <FormInput label="End Time" type="time" {...register('endTime')} error={errors.endTime?.message} />
        </div>

        <FormSelect 
          name="type" 
          control={control} 
          label="Type" 
          options={[
            { label: 'Consultation', value: 'Consultation' },
            { label: 'Follow-up', value: 'Follow-up' },
            { label: 'Routine Checkup', value: 'Routine Checkup' },
            { label: 'Emergency', value: 'Emergency' },
          ]}
          error={errors.type?.message}
        />

        <FormInput label="Reason" {...register('reason')} error={errors.reason?.message} />

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate('/appointments')}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateAppointment
