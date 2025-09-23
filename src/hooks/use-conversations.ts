import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  getUserConversations, 
  getConversationWithMessages, 
  createConversation, 
  updateConversation 
} from '@/lib/database/queries'
import { useAuth } from './use-auth'
import type { Conversation, ConversationWithMessages } from '@/types/database'

export function useConversations() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchConversations = useCallback(async () => {
    if (!user) {
      setConversations([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getUserConversations(supabase, user.id)
      setConversations(data)
    } catch (err) {
      console.error('Error fetching conversations:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch conversations')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  const createNewConversation = useCallback(async (title?: string) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const conversation = await createConversation(supabase, user.id, title)
      setConversations(prev => [conversation, ...prev])
      return conversation
    } catch (err) {
      console.error('Error creating conversation:', err)
      throw err
    }
  }, [user, supabase])

  const updateConversationTitle = useCallback(async (conversationId: string, title: string) => {
    try {
      const updatedConversation = await updateConversation(supabase, conversationId, { title })
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId ? updatedConversation : conv
        )
      )
      return updatedConversation
    } catch (err) {
      console.error('Error updating conversation:', err)
      throw err
    }
  }, [supabase])

  const archiveConversation = useCallback(async (conversationId: string) => {
    try {
      await updateConversation(supabase, conversationId, { is_active: false })
      setConversations(prev => prev.filter(conv => conv.id !== conversationId))
    } catch (err) {
      console.error('Error archiving conversation:', err)
      throw err
    }
  }, [supabase])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  // Real-time subscription for conversations
  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel('conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newConversation = payload.new as Conversation
            setConversations(prev => [newConversation, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            const updatedConversation = payload.new as Conversation
            setConversations(prev =>
              prev.map(conv =>
                conv.id === updatedConversation.id ? updatedConversation : conv
              )
            )
          } else if (payload.eventType === 'DELETE') {
            const deletedConversation = payload.old as Conversation
            setConversations(prev =>
              prev.filter(conv => conv.id !== deletedConversation.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, supabase])

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
    createConversation: createNewConversation,
    updateTitle: updateConversationTitle,
    archiveConversation,
  }
}

export function useConversation(conversationId: string | null) {
  const [conversation, setConversation] = useState<ConversationWithMessages | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchConversation = useCallback(async () => {
    if (!conversationId) {
      setConversation(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getConversationWithMessages(supabase, conversationId)
      setConversation(data)
    } catch (err) {
      console.error('Error fetching conversation:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch conversation')
    } finally {
      setLoading(false)
    }
  }, [conversationId, supabase])

  useEffect(() => {
    fetchConversation()
  }, [fetchConversation])

  return {
    conversation,
    loading,
    error,
    refetch: fetchConversation,
  }
}