import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Jennifer Brand Bot
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Powered MSP Sales & Marketing Assistant
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Chat Interface</h3>
            <p className="text-gray-600 mb-4">
              Professional chat with MSP-focused quick actions for LinkedIn posts, email templates, and sales strategies.
            </p>
            <Link 
              href="/chat"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Chatting →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Admin Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Analytics, user management, and system settings for your Jennifer Brand Bot deployment.
            </p>
            <Link 
              href="/admin"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Dashboard →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Features Built</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Real-time Chat</h4>
              <p className="text-gray-600 text-sm">Professional messaging interface with typing indicators</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ MSP Quick Actions</h4>
              <p className="text-gray-600 text-sm">Industry-specific prompts and templates</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Export Features</h4>
              <p className="text-gray-600 text-sm">Save conversations in multiple formats</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Admin Dashboard</h4>
              <p className="text-gray-600 text-sm">Analytics and user management</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Mobile Responsive</h4>
              <p className="text-gray-600 text-sm">Works perfectly on all devices</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">⏳ N8N Integration</h4>
              <p className="text-gray-600 text-sm">Ready for AI workflow connection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
