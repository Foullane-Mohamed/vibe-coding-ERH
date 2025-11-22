import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import axios from 'axios'

import { documentSchema, type DocumentFormValues } from '@/schemas/document.schema'

interface Patient {
  _id: string
  firstName: string
  lastName: string
}

const UploadDocument = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])

  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      type: 'Other'
    }
  })

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/patients`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPatients(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchPatients()
  }, [])

  const onSubmit = async (data: DocumentFormValues) => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('patientId', data.patientId)
      formData.append('type', data.type)
      formData.append('description', data.description)
      formData.append('file', data.file[0])

      await axios.post(`${import.meta.env.VITE_API_URL}/documents/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate('/documents')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload document')
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Upload Document</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <FormSelect 
          name="patientId" 
          control={control} 
          label="Patient" 
          options={patients.map(p => ({ label: `${p.firstName} ${p.lastName}`, value: p._id }))}
          placeholder="Select Patient"
          error={errors.patientId?.message}
        />

        <FormSelect 
          name="type" 
          control={control} 
          label="Document Type" 
          options={[
            { label: 'Lab Report', value: 'Lab Report' },
            { label: 'Imaging', value: 'Imaging' },
            { label: 'Prescription', value: 'Prescription' },
            { label: 'Other', value: 'Other' },
          ]}
          error={errors.type?.message}
        />

        <FormInput label="Description" {...register('description')} error={errors.description?.message} />

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            File
          </label>
          <input
            type="file"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register('file')}
          />
          {errors.file?.message && <p className="text-sm font-medium text-red-500">{errors.file.message as string}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate('/documents')}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UploadDocument
