import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

import { registerSchema, type RegisterFormValues } from '@/schemas/auth.schema'

const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setError('')
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or <Link to="/login" className="font-medium text-primary hover:text-primary/80">sign in to your account</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
            <Input id="firstName" {...register('firstName')} />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
            <Input id="lastName" {...register('lastName')} />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
          <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </div>
  )
}

export default Register
