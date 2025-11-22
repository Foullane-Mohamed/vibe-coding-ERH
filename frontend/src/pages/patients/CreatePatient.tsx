import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import axios from 'axios'

import { patientSchema, type PatientFormValues } from '@/schemas/patient.schema'

const CreatePatient = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: 'Male',
    }
  })

  const onSubmit = async (data: PatientFormValues) => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/patients`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/patients')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create patient')
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Register New Patient</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="First Name" {...register('firstName')} error={errors.firstName?.message} />
          <FormInput label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <FormInput label="Phone" {...register('phone')} error={errors.phone?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Date of Birth" type="date" {...register('dateOfBirth')} error={errors.dateOfBirth?.message} />
          <FormSelect 
            name="gender" 
            control={control} 
            label="Gender" 
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              { label: 'Other', value: 'Other' },
            ]}
            error={errors.gender?.message}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Address</h3>
          <FormInput label="Street" {...register('address.street')} error={errors.address?.street?.message} />
          <div className="grid grid-cols-3 gap-4">
            <FormInput label="City" {...register('address.city')} error={errors.address?.city?.message} />
            <FormInput label="State" {...register('address.state')} error={errors.address?.state?.message} />
            <FormInput label="Zip Code" {...register('address.zipCode')} error={errors.address?.zipCode?.message} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Emergency Contact</h3>
          <FormInput label="Name" {...register('emergencyContact.name')} error={errors.emergencyContact?.name?.message} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Phone" {...register('emergencyContact.phone')} error={errors.emergencyContact?.phone?.message} />
            <FormInput label="Relation" {...register('emergencyContact.relation')} error={errors.emergencyContact?.relation?.message} />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate('/patients')}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Patient'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreatePatient
