'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Users, Eye, Heart } from 'lucide-react'

interface AnalyticsData {
  date: string
  engagement: number
  reach: number
  clicks: number
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [data, setData] = useState<AnalyticsData[]>([])

  useEffect(() => {
    // Generate sample analytics data
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const newData: AnalyticsData[] = []

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      newData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        engagement: Math.floor(Math.random() * 1000) + 500,
        reach: Math.floor(Math.random() * 5000) + 2000,
        clicks: Math.floor(Math.random() * 500) + 100
      })
    }

    setData(newData)
  }, [timeRange])

  const metrics = [
    {
      label: 'Total Reach',
      value: '127.5K',
      change: '+12.5%',
      trend: 'up',
      icon: <Eye className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    {
      label: 'Engagement Rate',
      value: '8.4%',
      change: '+2.1%',
      trend: 'up',
      icon: <Heart className="w-6 h-6" />,
      color: 'text-pink-400'
    },
    {
      label: 'Click-through Rate',
      value: '3.2%',
      change: '-0.3%',
      trend: 'down',
      icon: <Users className="w-6 h-6" />,
      color: 'text-green-400'
    },
    {
      label: 'Ad Spend ROI',
      value: '4.2x',
      change: '+0.8x',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-yellow-400'
    }
  ]

  const platformPerformance = [
    { platform: 'Instagram', posts: 23, engagement: 15420, reach: 45200, color: 'bg-pink-500' },
    { platform: 'LinkedIn', posts: 12, engagement: 8930, reach: 28400, color: 'bg-blue-600' },
    { platform: 'Meta', posts: 18, engagement: 12100, reach: 38900, color: 'bg-blue-700' },
  ]

  const topPosts = [
    {
      id: 1,
      platform: 'Instagram',
      title: 'New Product Launch Carousel',
      engagement: 2840,
      reach: 12500,
      date: '2 days ago'
    },
    {
      id: 2,
      platform: 'LinkedIn',
      title: 'Industry Insights Article',
      engagement: 1920,
      reach: 8400,
      date: '3 days ago'
    },
    {
      id: 3,
      platform: 'Meta',
      title: 'Customer Success Story',
      engagement: 1650,
      reach: 7200,
      date: '5 days ago'
    }
  ]

  const aiInsights = [
    {
      type: 'recommendation',
      title: 'Optimal Posting Time Detected',
      description: 'Your audience is most active on Tuesdays at 2-4 PM. Schedule more posts during this window.',
      impact: 'high'
    },
    {
      type: 'warning',
      title: 'Engagement Drop on Meta',
      description: 'Meta engagement decreased by 15% this week. Consider refreshing content strategy.',
      impact: 'medium'
    },
    {
      type: 'success',
      title: 'LinkedIn Performance Surge',
      description: 'Thought leadership content is performing 40% better than average.',
      impact: 'high'
    },
    {
      type: 'recommendation',
      title: 'Hashtag Optimization',
      description: 'Using #DigitalMarketing and #MarketingTips together increases reach by 25%.',
      impact: 'medium'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Analytics & Insights</h2>
          <p className="text-gray-300">AI-powered performance analytics across all platforms</p>
        </div>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={metric.color}>{metric.icon}</div>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Simple Chart Visualization */}
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Engagement Trend</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {data.map((item, index) => {
            const maxEngagement = Math.max(...data.map(d => d.engagement))
            const height = (item.engagement / maxEngagement) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative group cursor-pointer hover:from-purple-500 hover:to-purple-300 transition-colors"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.engagement.toLocaleString()}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2 whitespace-nowrap">{item.date}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Platform Performance</h3>
        <div className="space-y-4">
          {platformPerformance.map((platform, index) => {
            const totalReach = platformPerformance.reduce((sum, p) => sum + p.reach, 0)
            const percentage = (platform.reach / totalReach) * 100
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{platform.platform}</span>
                  <span className="text-gray-300 text-sm">
                    {platform.posts} posts • {platform.engagement.toLocaleString()} engagement
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${platform.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Top Performing Posts</h3>
        <div className="space-y-3">
          {topPosts.map((post, index) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold text-purple-400">#{index + 1}</div>
                <div>
                  <h4 className="text-white font-medium">{post.title}</h4>
                  <p className="text-sm text-gray-400">{post.platform} • {post.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{post.engagement.toLocaleString()}</p>
                <p className="text-sm text-gray-400">engagement</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <span>🤖 AI-Generated Insights</span>
        </h3>
        <div className="space-y-3">
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                insight.type === 'success'
                  ? 'bg-green-600/10 border-green-500/30'
                  : insight.type === 'warning'
                  ? 'bg-yellow-600/10 border-yellow-500/30'
                  : 'bg-blue-600/10 border-blue-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{insight.title}</h4>
                  <p className="text-gray-300 text-sm">{insight.description}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    insight.impact === 'high'
                      ? 'bg-red-600/20 text-red-300'
                      : 'bg-yellow-600/20 text-yellow-300'
                  }`}
                >
                  {insight.impact} impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
