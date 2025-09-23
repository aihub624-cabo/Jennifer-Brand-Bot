export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-brand-gradient-subtle flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Check your email
          </h1>
          
          <p className="text-gray-600 mb-6">
            We've sent you a verification link. Please check your email and click the link to verify your account.
          </p>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or try signing up again.
            </p>
            
            <a
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors"
            >
              Back to sign in
            </a>
          </div>
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

export const metadata = {
  title: 'Verify Email - Jennifer Brand Bot',
  description: 'Verify your email address to complete registration',
}