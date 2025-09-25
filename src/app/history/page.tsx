'use client'

import { SimplifiedChatLayout } from '@/components/layout/simplified-chat-layout'
import Link from 'next/link'

export default function HistoryPage() {
  const demoHistory = [
    {
      id: '1',
      title: 'LinkedIn Strategy Discussion',
      preview: 'Help me create a LinkedIn post about AI in MSP...',
      date: '2024-01-15',
      messages: 12
    },
    {
      id: '2',
      title: 'Email Template Review',
      preview: 'I need an email template for reaching out to...',
      date: '2024-01-14',
      messages: 8
    },
    {
      id: '3',
      title: 'Sales Pitch Development',
      preview: 'Can you help me craft a sales pitch for...',
      date: '2024-01-13',
      messages: 15
    }
  ]

  return (
    <SimplifiedChatLayout activeTab="history">
      <div className="flex-1 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Conversation History</h1>
          <p className="text-sm text-gray-500">Your past conversations with Jennifer Bot</p>
        </div>

        {/* History List */}
        <div className="px-6 py-4">
          <div className="space-y-3 max-w-4xl">
            {demoHistory.map((conversation) => (
              <Link
                key={conversation.id}
                href="/chat"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{conversation.title}</h3>
                  <span className="text-xs text-gray-500">{conversation.messages} messages</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{conversation.preview}</p>
                <p className="text-xs text-gray-500">{new Date(conversation.date).toLocaleDateString()}</p>
              </Link>
            ))}
          </div>

          {/* Demo Mode Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-4xl">
            <div className="flex items-center text-sm text-blue-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Demo Mode - Showing sample conversation history
            </div>
          </div>
        </div>
      </div>
    </SimplifiedChatLayout>
  )
}