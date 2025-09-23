'use client'

import { useState } from 'react'
import { useMessages } from '@/hooks/use-messages'
import { cn } from '@/lib/utils/cn'

interface QuickActionsProps {
  conversationId: string
}

const quickActions = [
  {
    id: 'linkedin-post',
    label: 'LinkedIn Post',
    icon: '💼',
    prompt: 'Help me create an engaging LinkedIn post about AI in the MSP industry',
    category: 'content'
  },
  {
    id: 'email-template',
    label: 'Email Framework',
    icon: '📧',
    prompt: 'Create a professional email template for reaching out to potential MSP clients',
    category: 'content'
  },
  {
    id: 'ai-positioning',
    label: 'AI Positioning',
    icon: '🚀',
    prompt: 'How can I position AI solutions to my MSP clients effectively?',
    category: 'strategy'
  },
  {
    id: 'lead-generation',
    label: 'Lead Generation',
    icon: '🎯',
    prompt: 'What are effective lead generation strategies for MSP businesses?',
    category: 'strategy'
  },
  {
    id: 'sales-pitch',
    label: 'Sales Pitch',
    icon: '💡',
    prompt: 'Help me craft a compelling sales pitch for MSP services',
    category: 'sales'
  },
  {
    id: 'objection-handling',
    label: 'Objection Handling',
    icon: '🛡️',
    prompt: 'How do I handle common objections when selling MSP services?',
    category: 'sales'
  },
]

export function QuickActions({ conversationId }: QuickActionsProps) {
  const { sendMessage, sending } = useMessages(conversationId)
  const [showAll, setShowAll] = useState(false)

  const handleQuickAction = async (prompt: string) => {
    if (!sending) {
      await sendMessage(prompt)
    }
  }

  const visibleActions = showAll ? quickActions : quickActions.slice(0, 4)

  return (
    <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-gray-500">Quick Actions</p>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-brand-primary hover:text-brand-primary/80"
          >
            {showAll ? 'Show less' : 'Show more'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.prompt)}
              disabled={sending}
              className={cn(
                'inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full',
                'bg-white hover:bg-gray-50 text-gray-700',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary',
                'disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              )}
            >
              <span className="mr-1.5">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}