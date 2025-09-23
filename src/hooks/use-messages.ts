import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getConversationMessages, createMessage } from '@/lib/database/queries'
import { useAuth } from './use-auth'
import type { Message } from '@/types/database'

export function useMessages(conversationId: string | null) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchMessages = useCallback(async () => {
    if (!conversationId) {
      setMessages([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getConversationMessages(supabase, conversationId)
      setMessages(data)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }, [conversationId, supabase])

  const sendMessage = useCallback(async (content: string) => {
    if (!conversationId || !user) {
      throw new Error('Missing conversation or user')
    }

    try {
      setSending(true)
      setError(null)

      // Create user message
      const userMessage = await createMessage(
        supabase,
        conversationId,
        user.id,
        content,
        'user'
      )

      // Add user message to state immediately
      setMessages(prev => [...prev, userMessage])

      // TODO: Send to N8N webhook and get AI response
      // For now, create a placeholder assistant response
      const assistantMessage = await createMessage(
        supabase,
        conversationId,
        user.id,
        `Thanks for your message: "${content}". I'm Jennifer's AI assistant for MSP sales and marketing. The N8N integration will be implemented in the next step.`,
        'assistant',
        `session_${Date.now()}`,
        1500 // Mock processing time
      )

      setMessages(prev => [...prev, assistantMessage])

      return { userMessage, assistantMessage }
    } catch (err) {
      console.error('Error sending message:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message')
      throw err
    } finally {
      setSending(false)
    }
  }, [conversationId, user, supabase])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  // Real-time subscription for messages
  useEffect(() => {
    if (!conversationId) return

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message
          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(msg => msg.id === newMessage.id)) {
              return prev
            }
            return [...prev, newMessage]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId, supabase])

  return {
    messages,
    loading,
    sending,
    error,
    sendMessage,
    clearMessages,
    refetch: fetchMessages,
  }
}