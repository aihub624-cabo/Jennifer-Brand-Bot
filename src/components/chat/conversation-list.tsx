'use client'

import { formatRelativeTime, truncateText } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'
import type { Conversation } from '@/types/database'

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversation: Conversation | null
  onSelectConversation: (conversation: Conversation) => void
  loading: boolean
}

export function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
  loading
}: ConversationListProps) {
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-2">
        {conversations.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-sm font-medium text-gray-900 mb-1">No conversations yet</h3>
            <p className="text-xs text-gray-500">
              Start a new conversation to get help from Jennifer's AI assistant
            </p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={cn(
                'w-full text-left px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors',
                selectedConversation?.id === conversation.id
                  ? 'bg-brand-primary/10 border-l-2 border-brand-primary'
                  : 'hover:bg-gray-50'
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className={cn(
                    'w-2 h-2 rounded-full mt-2',
                    selectedConversation?.id === conversation.id
                      ? 'bg-brand-primary'
                      : 'bg-gray-400'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-sm font-medium truncate',
                    selectedConversation?.id === conversation.id
                      ? 'text-brand-primary'
                      : 'text-gray-900'
                  )}>
                    {conversation.title || 'Untitled Conversation'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatRelativeTime(conversation.updated_at)}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}