import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema'

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError('')
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or <Link to="/register" className="font-medium text-primary hover:text-primary/80">create a new account</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}

export default Login
