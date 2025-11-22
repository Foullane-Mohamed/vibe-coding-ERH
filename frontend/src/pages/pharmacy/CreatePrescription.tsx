import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import axios from 'axios'

import { prescriptionSchema, type PrescriptionFormValues } from '@/schemas/prescription.schema'

interface Consultation {
  _id: string
  appointment: {
    patient: { firstName: string; lastName: string }
    startTime: string
  }
}

const CreatePrescription = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [consultations, setConsultations] = useState<Consultation[]>([])

  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medications"
  })

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem('token')
        // In a real app, we'd filter for recent consultations by this doctor
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/consultations`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setConsultations(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchConsultations()
  }, [])

  const onSubmit = async (data: PrescriptionFormValues) => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/prescriptions`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/prescriptions')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create prescription')
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Prescription</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <FormSelect 
          name="consultationId" 
          control={control} 
          label="Consultation" 
          options={consultations.map(c => ({ 
            label: `${c.appointment.patient.firstName} ${c.appointment.patient.lastName} - ${new Date(c.appointment.startTime).toLocaleDateString()}`, 
            value: c._id 
          }))}
          placeholder="Select Consultation"
          error={errors.consultationId?.message}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Medications</h3>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', dosage: '', frequency: '', duration: '' })}>
              Add Medication
            </Button>
          </div>
          
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-md relative">
              <Button 
                type="button" 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => remove(index)}
              >
                X
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <FormInput 
                  label="Medication Name" 
                  {...register(`medications.${index}.name`)} 
                  error={errors.medications?.[index]?.name?.message} 
                />
                <FormInput 
                  label="Dosage" 
                  {...register(`medications.${index}.dosage`)} 
                  error={errors.medications?.[index]?.dosage?.message} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormInput 
                  label="Frequency" 
                  {...register(`medications.${index}.frequency`)} 
                  error={errors.medications?.[index]?.frequency?.message} 
                />
                <FormInput 
                  label="Duration" 
                  {...register(`medications.${index}.duration`)} 
                  error={errors.medications?.[index]?.duration?.message} 
                />
              </div>
              <FormInput 
                label="Instructions" 
                {...register(`medications.${index}.instructions`)} 
                error={errors.medications?.[index]?.instructions?.message} 
              />
            </div>
          ))}
          {errors.medications?.message && <p className="text-sm text-red-500">{errors.medications.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register('notes')}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate('/prescriptions')}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Issuing...' : 'Issue Prescription'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreatePrescription
