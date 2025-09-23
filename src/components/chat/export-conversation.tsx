'use client'

import { useState } from 'react'
import { useMessages } from '@/hooks/use-messages'
import type { Conversation } from '@/types/database'
import toast from 'react-hot-toast'

interface ExportConversationProps {
  conversation: Conversation
}

export function ExportConversation({ conversation }: ExportConversationProps) {
  const { messages } = useMessages(conversation.id)
  const [isExporting, setIsExporting] = useState(false)

  const exportAsText = () => {
    const content = messages.map(msg => {
      const role = msg.role === 'user' ? 'You' : 'Jennifer Bot'
      const time = new Date(msg.created_at).toLocaleString()
      return `[${time}] ${role}: ${msg.content}`
    }).join('\n\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversation-${conversation.id}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Conversation exported successfully')
  }

  const exportAsJSON = () => {
    const data = {
      conversation: {
        id: conversation.id,
        title: conversation.title,
        created_at: conversation.created_at,
        updated_at: conversation.updated_at,
      },
      messages: messages.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        created_at: msg.created_at,
        processing_time: msg.processing_time,
      })),
      exported_at: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversation-${conversation.id}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Conversation exported as JSON')
  }

  const exportAsMarkdown = () => {
    let content = `# ${conversation.title || 'Conversation'}\n\n`
    content += `**Date:** ${new Date(conversation.created_at).toLocaleDateString()}\n\n`
    content += `---\n\n`

    messages.forEach(msg => {
      const role = msg.role === 'user' ? '**You**' : '**Jennifer Bot**'
      const time = new Date(msg.created_at).toLocaleTimeString()
      content += `### ${role} - ${time}\n\n${msg.content}\n\n---\n\n`
    })

    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversation-${conversation.id}-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Conversation exported as Markdown')
  }

  const copyToClipboard = async () => {
    const content = messages.map(msg => {
      const role = msg.role === 'user' ? 'You' : 'Jennifer Bot'
      return `${role}: ${msg.content}`
    }).join('\n\n')

    try {
      await navigator.clipboard.writeText(content)
      toast.success('Conversation copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsExporting(!isExporting)}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {isExporting && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                exportAsText()
                setIsExporting(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export as Text
              </div>
            </button>
            
            <button
              onClick={() => {
                exportAsMarkdown()
                setIsExporting(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Export as Markdown
              </div>
            </button>
            
            <button
              onClick={() => {
                exportAsJSON()
                setIsExporting(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                Export as JSON
              </div>
            </button>
            
            <hr className="my-1 border-gray-200" />
            
            <button
              onClick={() => {
                copyToClipboard()
                setIsExporting(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v10m-6 0a2 2 0 01-2-2V7a2 2 0 012-2h2" />
                </svg>
                Copy to Clipboard
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}