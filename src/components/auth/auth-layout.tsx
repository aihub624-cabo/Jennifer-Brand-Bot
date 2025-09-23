'use client'

import { useState } from 'react'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'

interface AuthLayoutProps {
  initialMode?: 'login' | 'register'
  redirectTo?: string
}

export function AuthLayout({ initialMode = 'login', redirectTo }: AuthLayoutProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  return (
    <div className="min-h-screen bg-brand-gradient-subtle flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {mode === 'login' ? (
            <LoginForm onToggleMode={toggleMode} redirectTo={redirectTo} />
          ) : (
            <RegisterForm onToggleMode={toggleMode} redirectTo={redirectTo} />
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Powered by{' '}
            <span className="font-semibold text-brand-primary">
              Jennifer Bleam MSP
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}