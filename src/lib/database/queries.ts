import type { 
  Database, 
  Profile, 
  ProfileWithOrganization, 
  Conversation, 
  ConversationWithMessages,
  Message,
  UsageLog 
} from '@/types/database'
import type { SupabaseClient } from '@supabase/supabase-js'

type DatabaseClient = SupabaseClient<Database>

// Profile queries
export const getProfile = async (supabase: DatabaseClient, userId: string): Promise<ProfileWithOrganization | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      organization:organizations(*)
    `)
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as ProfileWithOrganization
}

export const updateProfile = async (
  supabase: DatabaseClient, 
  userId: string, 
  updates: Partial<Profile>
): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getOrganizationProfiles = async (
  supabase: DatabaseClient, 
  organizationId: string
): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Conversation queries
export const getUserConversations = async (
  supabase: DatabaseClient, 
  userId: string
): Promise<Conversation[]> => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

export const getConversationWithMessages = async (
  supabase: DatabaseClient, 
  conversationId: string
): Promise<ConversationWithMessages | null> => {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      messages(*)
    `)
    .eq('id', conversationId)
    .single()

  if (error) throw error
  return data as ConversationWithMessages
}

export const createConversation = async (
  supabase: DatabaseClient, 
  userId: string, 
  title?: string
): Promise<Conversation> => {
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user_id: userId,
      title: title || `Conversation ${new Date().toLocaleDateString()}`
    })
    .select()
    .single()

  if (error) throw error

  // Log usage
  await supabase.rpc('log_usage', {
    p_user_id: userId,
    p_action: 'conversation_created',
    p_details: { conversation_id: data.id }
  })

  return data
}

export const updateConversation = async (
  supabase: DatabaseClient, 
  conversationId: string, 
  updates: Partial<Conversation>
): Promise<Conversation> => {
  const { data, error } = await supabase
    .from('conversations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', conversationId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Message queries
export const getConversationMessages = async (
  supabase: DatabaseClient, 
  conversationId: string,
  limit = 50
): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data
}

export const createMessage = async (
  supabase: DatabaseClient,
  conversationId: string,
  userId: string,
  content: string,
  role: 'user' | 'assistant',
  n8nSessionId?: string,
  processingTime?: number
): Promise<Message> => {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      user_id: userId,
      content,
      role,
      n8n_session_id: n8nSessionId,
      processing_time: processingTime
    })
    .select()
    .single()

  if (error) throw error

  // Log usage for user messages
  if (role === 'user') {
    await supabase.rpc('log_usage', {
      p_user_id: userId,
      p_action: 'message_sent',
      p_details: { 
        conversation_id: conversationId,
        message_id: data.id,
        content_length: content.length
      }
    })
  }

  return data
}

// Usage analytics queries
export const getUserUsageStats = async (
  supabase: DatabaseClient,
  userId: string,
  days = 30
): Promise<{
  totalMessages: number
  conversationsCount: number
  averageResponseTime: number
  quotaUsage: { used: number; limit: number; resetDate: string }
}> => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Get profile for quota info
  const profile = await getProfile(supabase, userId)
  if (!profile) throw new Error('Profile not found')

  // Get message count
  const { count: messageCount } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('role', 'user')
    .gte('created_at', startDate.toISOString())

  // Get conversations count
  const { count: conversationsCount } = await supabase
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startDate.toISOString())

  // Get average response time
  const { data: responseTimes } = await supabase
    .from('messages')
    .select('processing_time')
    .eq('user_id', userId)
    .eq('role', 'assistant')
    .not('processing_time', 'is', null)
    .gte('created_at', startDate.toISOString())

  const averageResponseTime = responseTimes?.reduce((acc, msg) => 
    acc + (msg.processing_time || 0), 0
  ) / (responseTimes?.length || 1) || 0

  return {
    totalMessages: messageCount || 0,
    conversationsCount: conversationsCount || 0,
    averageResponseTime,
    quotaUsage: {
      used: profile.messages_used,
      limit: profile.message_quota,
      resetDate: profile.quota_reset_date
    }
  }
}

export const getOrganizationUsageStats = async (
  supabase: DatabaseClient,
  organizationId: string,
  days = 30
) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('usage_logs')
    .select('*')
    .eq('organization_id', organizationId)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false })

  if (error) throw error

  const messagesSent = data.filter(log => log.action === 'message_sent').length
  const conversationsCreated = data.filter(log => log.action === 'conversation_created').length
  const activeUsers = new Set(data.map(log => log.user_id)).size

  return {
    messagesSent,
    conversationsCreated,
    activeUsers,
    totalActions: data.length
  }
}

// Admin queries
export const createUser = async (
  supabase: DatabaseClient,
  email: string,
  password: string,
  fullName: string,
  role: 'admin' | 'team_lead' | 'team_member' | 'user' = 'user'
) => {
  // Note: This would typically be handled by Supabase Auth admin API
  // For now, users will sign up normally and admins can update their roles
  throw new Error('User creation should be handled through Supabase Auth signup')
}

export const updateUserRole = async (
  supabase: DatabaseClient,
  userId: string,
  role: 'admin' | 'team_lead' | 'team_member' | 'user'
): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const toggleUserActive = async (
  supabase: DatabaseClient,
  userId: string,
  isActive: boolean
): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}