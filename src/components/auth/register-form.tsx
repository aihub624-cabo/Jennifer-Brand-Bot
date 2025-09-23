'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/hooks/use-auth'
import { validatePassword } from '@/lib/auth/auth-utils'
import { cn } from '@/lib/utils/cn'
import toast from 'react-hot-toast'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().refine(
    (password) => validatePassword(password).isValid,
    {
      message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    }
  ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onToggleMode?: () => void
  redirectTo?: string
}

export function RegisterForm({ onToggleMode, redirectTo = '/chat' }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState<{
    isValid: boolean
    errors: string[]
  }>({ isValid: false, errors: [] })
  const { signUp } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const watchedPassword = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      const { error } = await signUp(data.email, data.password, data.fullName)

      if (error) {
        if (error.includes('already registered')) {
          setError('email', { message: 'This email is already registered' })
        } else {
          toast.error(error)
        }
        return
      }

      toast.success('Account created! Please check your email to verify your account.')
      router.push('/auth/verify-email')
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Update password validation in real-time
  useState(() => {
    if (watchedPassword) {
      setPasswordValidation(validatePassword(watchedPassword))
    }
  })

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <div className="w-12 h-12 mx-auto mb-4 bg-brand-primary rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="text-sm text-gray-600 mt-2">
          Join Jennifer's MSP team
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <div className="mt-1">
            <input
              {...register('fullName')}
              type="text"
              autoComplete="name"
              className={cn(
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary',
                errors.fullName
                  ? 'border-red-300 text-red-900 placeholder-red-300'
                  : 'border-gray-300'
              )}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className={cn(
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary',
                errors.email
                  ? 'border-red-300 text-red-900 placeholder-red-300'
                  : 'border-gray-300'
              )}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              {...register('password')}
              type="password"
              autoComplete="new-password"
              className={cn(
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary',
                errors.password
                  ? 'border-red-300 text-red-900 placeholder-red-300'
                  : 'border-gray-300'
              )}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
            {watchedPassword && !passwordValidation.isValid && passwordValidation.errors.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Password requirements:</p>
                <ul className="ml-2 space-y-1">
                  {passwordValidation.errors.map((error, index) => (
                    <li key={index} className="text-red-600">• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <div className="mt-1">
            <input
              {...register('confirmPassword')}
              type="password"
              autoComplete="new-password"
              className={cn(
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary',
                errors.confirmPassword
                  ? 'border-red-300 text-red-900 placeholder-red-300'
                  : 'border-gray-300'
              )}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white',
              'bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>

        {onToggleMode && (
          <div className="text-center">
            <button
              type="button"
              onClick={onToggleMode}
              className="text-sm text-brand-primary hover:text-brand-primary/80"
            >
              Already have an account? Sign in
            </button>
          </div>
        )}
      </form>
    </div>
  )
}