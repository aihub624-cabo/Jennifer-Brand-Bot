'use client'

import { useAuth } from '@/hooks/use-auth'

export default function ChatPage() {
  const { user, profile, signOut, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Jennifer Brand Bot</h1>
                <p className="text-sm text-gray-500">AI Assistant for MSP Sales & Marketing</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.full_name || user?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
              </div>
              <button
                onClick={signOut}
                className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome to Jennifer Brand Bot!</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">🎉 Authentication System Complete!</h3>
              <p className="text-blue-800 text-sm">
                You have successfully signed in to Jennifer Brand Bot. The authentication system is working correctly.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Your Profile Information:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Name:</strong> {profile?.full_name || 'Not set'}</p>
                <p><strong>Role:</strong> {profile?.role}</p>
                <p><strong>Organization:</strong> {profile?.organization?.name}</p>
                <p><strong>Messages Used:</strong> {profile?.messages_used}/{profile?.message_quota}</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 mb-2">✅ Step 2 Complete - Authentication System</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Supabase Auth with email/password ✓</li>
                <li>• Login/register forms with validation ✓</li>
                <li>• Protected route middleware ✓</li>
                <li>• AuthProvider context ✓</li>
                <li>• Role-based access control ✓</li>
                <li>• Auto-assignment to Jennifer's organization ✓</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-medium text-yellow-900 mb-2">🚧 Next: Step 3 - Database Integration & Types</h3>
              <p className="text-yellow-800 text-sm">
                Ready to proceed with database integration, TypeScript types, and user management features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}