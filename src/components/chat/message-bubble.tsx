'use client'

import { formatMessageTime } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'
import type { Message } from '@/types/database'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn(
        'flex max-w-lg',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}>
        {/* Avatar */}
        <div className={cn(
          'flex-shrink-0',
          isUser ? 'ml-3' : 'mr-3'
        )}>
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium',
            isUser ? 'bg-brand-primary' : 'bg-brand-secondary'
          )}>
            {isUser ? 'U' : 'JB'}
          </div>
        </div>

        {/* Message bubble */}
        <div className={cn(
          'px-4 py-2 rounded-2xl',
          isUser 
            ? 'bg-brand-primary text-white rounded-br-sm' 
            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
        )}>
          {/* Message content */}
          <div className={cn(
            'text-sm whitespace-pre-wrap break-words',
            isUser ? 'text-white' : 'text-gray-900'
          )}>
            {message.content}
          </div>

          {/* Timestamp */}
          <div className={cn(
            'text-xs mt-1',
            isUser ? 'text-blue-100' : 'text-gray-500'
          )}>
            {formatMessageTime(message.created_at)}
            {message.processing_time && !isUser && (
              <span className="ml-2">
                • {(message.processing_time / 1000).toFixed(1)}s
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}