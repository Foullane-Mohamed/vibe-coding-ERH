import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import axios from 'axios'

import { labOrderSchema, type LabOrderFormValues } from '@/schemas/lab.schema'

interface Patient {
  _id: string
  firstName: string
  lastName: string
}

const CreateLabOrder = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])

  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LabOrderFormValues>({
    resolver: zodResolver(labOrderSchema),
    defaultValues: {
      tests: [{ name: '', code: '' }],
      priority: 'routine'
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tests"
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

  const onSubmit = async (data: LabOrderFormValues) => {
    try {
      setError('')
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/lab-orders`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/lab-orders')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create lab order')
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Lab Order</h1>
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
          name="priority" 
          control={control} 
          label="Priority" 
          options={[
            { label: 'Routine', value: 'routine' },
            { label: 'Urgent', value: 'urgent' },
            { label: 'Stat', value: 'stat' },
          ]}
          error={errors.priority?.message}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Tests</h3>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', code: '' })}>
              Add Test
            </Button>
          </div>
          
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end">
              <div className="flex-1">
                <FormInput 
                  label={index === 0 ? "Test Name" : ""} 
                  {...register(`tests.${index}.name`)} 
                  error={errors.tests?.[index]?.name?.message} 
                />
              </div>
              <div className="flex-1">
                <FormInput 
                  label={index === 0 ? "Code (Optional)" : ""} 
                  {...register(`tests.${index}.code`)} 
                  error={errors.tests?.[index]?.code?.message} 
                />
              </div>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                X
              </Button>
            </div>
          ))}
          {errors.tests?.message && <p className="text-sm text-red-500">{errors.tests.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register('notes')}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate('/lab-orders')}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ordering...' : 'Place Order'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateLabOrder
