// This page will redirect users via middleware
// - Authenticated users -> /chat
// - Unauthenticated users -> /auth/login

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-gradient-subtle flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Jennifer Brand Bot...</p>
      </div>
    </div>
  )
}
