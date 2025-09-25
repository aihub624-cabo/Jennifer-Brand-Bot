'use client'

import { SimplifiedChatLayout } from '@/components/layout/simplified-chat-layout'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <SimplifiedChatLayout activeTab="profile">
      <div className="flex-1 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500">Manage your account settings</p>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-6">
          <div className="max-w-2xl space-y-6">
            {/* User Info Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  DU
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
                  <p className="text-sm text-gray-600">Manage your account information</p>
                </div>
              </div>

              {/* Username Field */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value="Demo User"
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value="demo@example.com"
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                  />
                </div>

                {/* Change Password Button */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span className="text-sm text-gray-700">Email notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span className="text-sm text-gray-700">Save conversation history</span>
                </label>
              </div>
            </div>

            {/* Demo Mode Notice */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center text-sm text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Demo Mode - Profile settings are view-only
              </div>
            </div>

            {/* Logout Button */}
            <button className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
              Sign Out (Demo)
            </button>
          </div>
        </div>
      </div>
    </SimplifiedChatLayout>
  )
}