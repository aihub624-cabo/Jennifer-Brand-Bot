'use client'

import { Sidebar } from './sidebar'

interface SimplifiedChatLayoutProps {
  children: React.ReactNode
  activeTab?: 'chat' | 'history' | 'profile'
}

export function SimplifiedChatLayout({ children, activeTab = 'chat' }: SimplifiedChatLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} />

      {/* Main Content Area - Add padding on mobile for hamburger menu */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 ml-0">
        <div className="lg:hidden h-16"></div>
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}