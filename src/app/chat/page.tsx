'use client'

import { useState } from 'react'
import { SimplifiedChatLayout } from '@/components/layout/simplified-chat-layout'

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{id: string, content: string, role: 'user' | 'assistant', created_at: string}>>([
    {
      id: '1',
      content: "Hi! I'm Jennifer's AI Assistant. I'm here to help you with MSP sales strategies, LinkedIn content, email frameworks, and AI positioning. How can I assist you today?",
      role: 'assistant',
      created_at: new Date().toISOString()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const sendMessage = (content: string) => {
    if (content.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        content: content,
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
      setInputValue('')
    }
  }

  return (
    <SimplifiedChatLayout activeTab="chat">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Jennifer Brand Bot</h1>
            <p className="text-sm text-gray-500">MSP Sales & Marketing Assistant</p>
          </div>
          <div className="text-sm text-green-600 font-medium flex items-center">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
            Demo Mode
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end max-w-xs sm:max-w-md lg:max-w-2xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      message.role === 'user' ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}>
                      {message.role === 'user' ? 'U' : 'JB'}
                    </div>
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  } ${message.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-gray-500' : 'text-white/70'
                    }`}>
                      {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Section with Quick Actions */}
      <div className="border-t border-gray-200 bg-white">
        {/* Message Input */}
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-2 sm:space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="block w-full resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900 text-sm sm:text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage(inputValue)
                    }
                  }}
                />
              </div>
              <button
                onClick={() => sendMessage(inputValue)}
                className="inline-flex items-center justify-center p-2.5 sm:p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'LinkedIn Post', icon: '💼' },
                  { label: 'Email Template', icon: '📧' },
                  { label: 'AI Positioning', icon: '🚀' },
                  { label: 'Sales Pitch', icon: '💡' }
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(`Help me create a ${action.label.toLowerCase()}`)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-200 text-xs sm:text-sm font-medium rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <span className="mr-1.5">{action.icon}</span>
                    <span className="hidden sm:inline">{action.label}</span>
                    <span className="sm:hidden">{action.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Mode Indicator */}
            <div className="mt-2 text-xs text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Demo Mode - Connect to N8N for full AI responses
            </div>
          </div>
        </div>
      </div>
    </SimplifiedChatLayout>
  )
}