'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { useMessages } from '@/hooks/use-messages'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils/cn'
import toast from 'react-hot-toast'

interface MessageInputProps {
  conversationId: string
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const { profile } = useAuth()
  const { sendMessage, sending } = useMessages(conversationId)
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async () => {
    const message = input.trim()
    if (!message || sending) return

    // Check quota
    if (profile && profile.messages_used >= profile.message_quota) {
      toast.error('You have reached your monthly message limit')
      return
    }

    try {
      setInput('')
      await sendMessage(message)
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    } catch (error) {
      toast.error('Failed to send message')
      setInput(message) // Restore message on error
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Shift+Enter for new line)"
              disabled={sending}
              rows={1}
              className={cn(
                'block w-full resize-none border-0 bg-gray-100 rounded-lg px-4 py-3',
                'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'placeholder-gray-500 text-gray-900'
              )}
              style={{ maxHeight: '200px' }}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || sending}
            className={cn(
              'inline-flex items-center justify-center p-3 rounded-lg',
              'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary',
              input.trim() && !sending
                ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
          >
            {sending ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        {/* Quota warning */}
        {profile && profile.messages_used >= profile.message_quota * 0.9 && (
          <div className="mt-2 text-xs text-yellow-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {profile.messages_used}/{profile.message_quota} messages used this month
          </div>
        )}
      </div>
    </div>
  )
}