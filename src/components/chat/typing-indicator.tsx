'use client'

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-lg">
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-white text-sm font-medium">
            JB
          </div>
        </div>
        <div className="px-4 py-3 rounded-2xl bg-gray-100 rounded-bl-sm">
          <div className="flex space-x-1">
            <div className="typing-indicator w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="typing-indicator w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="typing-indicator w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}