'use client'

import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminLayoutProps {
  children: React.ReactNode
  currentPage?: 'dashboard' | 'users' | 'analytics' | 'settings'
}

export function AdminLayout({ children, currentPage = 'dashboard' }: AdminLayoutProps) {
  const { user, profile, signOut, permissions } = useAuth()
  const router = useRouter()

  // Redirect if not admin
  if (profile && !permissions.canAccessAdmin()) {
    router.push('/chat')
    return null
  }

  // No navigation items needed - client only sees ROI dashboard

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                Jennifer Brand Bot
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/chat"
                className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50"
              >
                Chat Interface
              </Link>
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

      {/* Page content */}
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}