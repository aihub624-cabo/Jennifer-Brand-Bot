'use client'

import { useState } from 'react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { useOrganizationStats } from '@/hooks/use-users'

// Mock data for demonstration
const messageData = [
  { date: '2024-01-01', messages: 45, users: 12 },
  { date: '2024-01-02', messages: 62, users: 18 },
  { date: '2024-01-03', messages: 38, users: 15 },
  { date: '2024-01-04', messages: 78, users: 22 },
  { date: '2024-01-05', messages: 92, users: 28 },
  { date: '2024-01-06', messages: 67, users: 20 },
  { date: '2024-01-07', messages: 83, users: 25 },
  { date: '2024-01-08', messages: 105, users: 32 },
  { date: '2024-01-09', messages: 88, users: 27 },
  { date: '2024-01-10', messages: 112, users: 35 },
  { date: '2024-01-11', messages: 95, users: 30 },
  { date: '2024-01-12', messages: 127, users: 38 },
  { date: '2024-01-13', messages: 108, users: 33 },
  { date: '2024-01-14', messages: 134, users: 41 },
]

const roleDistribution = [
  { name: 'Users', value: 45, color: '#8884d8' },
  { name: 'Team Members', value: 12, color: '#82ca9d' },
  { name: 'Team Leads', value: 5, color: '#ffc658' },
  { name: 'Admins', value: 2, color: '#ff7300' },
]

const responseTimeData = [
  { hour: '00:00', avgTime: 1200 },
  { hour: '02:00', avgTime: 980 },
  { hour: '04:00', avgTime: 850 },
  { hour: '06:00', avgTime: 1100 },
  { hour: '08:00', avgTime: 1800 },
  { hour: '10:00', avgTime: 2200 },
  { hour: '12:00', avgTime: 2500 },
  { hour: '14:00', avgTime: 2100 },
  { hour: '16:00', avgTime: 1900 },
  { hour: '18:00', avgTime: 1600 },
  { hour: '20:00', avgTime: 1300 },
  { hour: '22:00', avgTime: 1100 },
]

const topicsData = [
  { topic: 'LinkedIn Strategy', count: 45 },
  { topic: 'Email Templates', count: 38 },
  { topic: 'AI Positioning', count: 32 },
  { topic: 'Lead Generation', count: 28 },
  { topic: 'MSP Sales', count: 25 },
  { topic: 'Content Creation', count: 22 },
]

interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

export function AnalyticsCharts() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const { stats, loading } = useOrganizationStats(timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90)

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">
            Insights into user activity and system performance
          </p>
        </div>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timeRange === range
                  ? 'bg-brand-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Over Time */}
      <ChartCard 
        title="Message Activity" 
        description="Daily message volume and active users"
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={messageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="messages" 
              fill="#2D5AA0" 
              name="Messages"
              opacity={0.7}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="users" 
              stroke="#F4A261" 
              strokeWidth={3}
              name="Active Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Role Distribution */}
        <ChartCard 
          title="User Distribution" 
          description="Users by role across the organization"
        >
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Response Time Analysis */}
        <ChartCard 
          title="Response Times" 
          description="Average AI response time by hour"
        >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis tickFormatter={(value) => `${value}ms`} />
              <Tooltip 
                formatter={(value) => [`${value}ms`, 'Avg Response Time']}
              />
              <Area 
                type="monotone" 
                dataKey="avgTime" 
                stroke="#2D5AA0" 
                fill="#2D5AA0" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Popular Topics */}
      <ChartCard 
        title="Popular Topics" 
        description="Most frequently discussed topics in conversations"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topicsData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="topic" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#F4A261" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Usage Trends */}
      <ChartCard 
        title="Usage Trends" 
        description="Message volume trends over time"
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={messageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Area 
              type="monotone" 
              dataKey="messages" 
              stackId="1"
              stroke="#2D5AA0" 
              fill="#2D5AA0" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Messages/Day</p>
              <p className="text-2xl font-bold text-gray-900">87</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">1.8s</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">User Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}