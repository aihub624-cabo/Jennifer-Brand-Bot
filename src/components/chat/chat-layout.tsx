'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useConversations } from '@/hooks/use-conversations'
import { ConversationList } from './conversation-list'
import { MessageList } from './message-list'
import { MessageInput } from './message-input'
import { ChatHeader } from './chat-header'
import { QuickActions } from './quick-actions'
import { cn } from '@/lib/utils/cn'
import type { Conversation } from '@/types/database'

export function ChatLayout() {
  const { user, profile } = useAuth()
  const { conversations, loading, createConversation } = useConversations()
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNewConversation = async () => {
    try {
      const conversation = await createConversation()
      setSelectedConversation(conversation)
    } catch (error) {
      console.error('Error creating conversation:', error)
    }
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:transform-none',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        !sidebarOpen && 'lg:w-0 lg:overflow-hidden'
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Jennifer Brand Bot</h2>
                  <p className="text-xs text-gray-500">AI Assistant for MSP</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* New Conversation Button */}
            <button
              onClick={handleNewConversation}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
            >
              <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Conversation
            </button>
          </div>

          {/* Conversation List */}
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            loading={loading}
          />

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {profile?.full_name || user?.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {profile?.messages_used}/{profile?.message_quota} messages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader
          conversation={selectedConversation}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {selectedConversation ? (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-hidden">
              <MessageList conversationId={selectedConversation.id} />
            </div>

            {/* Quick Actions */}
            <QuickActions conversationId={selectedConversation.id} />

            {/* Message Input */}
            <MessageInput conversationId={selectedConversation.id} />
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Jennifer Brand Bot</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Your AI assistant for MSP sales content, LinkedIn strategies, and email frameworks. 
                Start a new conversation or select an existing one to begin.
              </p>
              <button
                onClick={handleNewConversation}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
              >
                <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start New Conversation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}