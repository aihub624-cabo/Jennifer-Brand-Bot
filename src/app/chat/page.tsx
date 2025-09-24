'use client'

import { useState } from 'react'
import { MessageInput } from '@/components/chat/message-input'
import { QuickActions } from '@/components/chat/quick-actions'

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{id: string, content: string, role: 'user' | 'assistant', created_at: string}>>([
    {
      id: '1',
      content: "Hi! I'm Jennifer's AI Assistant. I'm here to help you with MSP sales strategies, LinkedIn content, email frameworks, and AI positioning. How can I assist you today?",
      role: 'assistant',
      created_at: new Date().toISOString()
    }
  ])

  const mockConversationId = 'demo-conversation'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
              JB
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Jennifer Brand Bot</h1>
              <p className="text-sm text-gray-500">MSP Sales & Marketing Assistant</p>
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium">● Demo Mode</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-lg ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    message.role === 'user' ? 'bg-blue-600' : 'bg-orange-500'
                  }`}>
                    {message.role === 'user' ? 'U' : 'JB'}
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}>
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Quick Actions</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'LinkedIn Post', icon: '💼' },
              { label: 'Email Template', icon: '📧' },
              { label: 'AI Positioning', icon: '🚀' },
              { label: 'Sales Pitch', icon: '💡' }
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  const newMessage = {
                    id: Date.now().toString(),
                    content: `Help me create ${action.label.toLowerCase()}`,
                    role: 'user' as const,
                    created_at: new Date().toISOString()
                  }
                  const response = {
                    id: (Date.now() + 1).toString(),
                    content: `I'd be happy to help you create a ${action.label.toLowerCase()}! This is demo mode - in the full version, I would provide detailed assistance with MSP-focused content.`,
                    role: 'assistant' as const,
                    created_at: new Date().toISOString()
                  }
                  setMessages(prev => [...prev, newMessage, response])
                }}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full bg-white hover:bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <span className="mr-1.5">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Message Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Type your message... (Demo mode - messages won't be processed)"
                className="block w-full resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement
                    if (input.value.trim()) {
                      const newMessage = {
                        id: Date.now().toString(),
                        content: input.value,
                        role: 'user' as const,
                        created_at: new Date().toISOString()
                      }
                      const response = {
                        id: (Date.now() + 1).toString(),
                        content: `Thanks for your message! This is demo mode. In the full version with N8N integration, I would provide intelligent responses based on Jennifer's MSP expertise.`,
                        role: 'assistant' as const,
                        created_at: new Date().toISOString()
                      }
                      setMessages(prev => [...prev, newMessage, response])
                      input.value = ''
                    }
                  }
                }}
              />
            </div>
            <button className="inline-flex items-center justify-center p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div className="mt-2 text-xs text-blue-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Demo Mode - Connect to N8N for full AI responses
          </div>
        </div>
      </div>
    </div>
  )
}