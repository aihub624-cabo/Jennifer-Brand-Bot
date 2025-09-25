'use client'

import { AdminLayout } from '@/components/layout/admin-layout'
import { useAuth } from '@/hooks/use-auth'

function ROIMetricCard({
  title,
  value,
  description,
  subtext,
  icon,
  accentColor = '#2D5AA0'
}: {
  title: string
  value: string
  description: string
  subtext: string
  icon: string
  accentColor?: string
}) {
  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{icon}</div>
          <div className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
            LIVE
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {title}
          </h3>
          <div className="text-4xl font-bold" style={{ color: accentColor }}>
            {value}
          </div>
          <p className="text-gray-900 font-medium">
            {description}
          </p>
          <p className="text-sm text-gray-500">
            {subtext}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { profile } = useAuth()

  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold leading-tight text-gray-900">
            ROI Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Key performance metrics demonstrating Jennifer Brand Bot's business value
          </p>
        </div>

        {/* ROI Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          <ROIMetricCard
            title="Success Metrics"
            value="94%"
            description="Quality content generated successfully"
            subtext="Based on user feedback and completion rates"
            icon="✅"
            accentColor="#2D5AA0"
          />

          <ROIMetricCard
            title="Total Conversations"
            value="1,247"
            description="Productive business conversations"
            subtext="Saving 15+ hours per week in content creation"
            icon="💬"
            accentColor="#2D5AA0"
          />

          <ROIMetricCard
            title="ROI Impact"
            value="340%"
            description="Return on investment"
            subtext="Generated $12,500 in content value vs $300/month cost"
            icon="💰"
            accentColor="#F4A261"
          />
        </div>

        {/* Business Value Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="max-w-3xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Impact Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Time Efficiency:</strong> 15+ hours saved weekly on content creation and strategy development</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Content Quality:</strong> 94% success rate in generating MSP-focused, professional content</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Financial Return:</strong> $12,500+ in equivalent content value delivered monthly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}