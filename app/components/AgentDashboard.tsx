'use client'

import { useState, useEffect } from 'react'
import { Brain, MessageSquare, Image, BarChart3, Calendar, Target } from 'lucide-react'

interface AgentDashboardProps {
  isRunning: boolean
}

interface AgentAction {
  id: string
  type: string
  platform: string
  action: string
  status: 'running' | 'completed' | 'pending'
  timestamp: Date
}

export default function AgentDashboard({ isRunning }: AgentDashboardProps) {
  const [actions, setActions] = useState<AgentAction[]>([
    {
      id: '1',
      type: 'content',
      platform: 'Meta',
      action: 'Analyzing audience engagement patterns',
      status: 'completed',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '2',
      type: 'schedule',
      platform: 'LinkedIn',
      action: 'Scheduling weekly thought leadership post',
      status: 'completed',
      timestamp: new Date(Date.now() - 60000)
    }
  ])

  const agentCapabilities = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Content Generation',
      description: 'AI-powered post creation, copywriting, and content optimization',
      color: 'text-blue-400'
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: 'Visual Design',
      description: 'Automated image selection and basic graphic generation',
      color: 'text-purple-400'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Smart Scheduling',
      description: 'Optimal posting times based on audience behavior analysis',
      color: 'text-green-400'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics & Insights',
      description: 'Real-time performance tracking and optimization recommendations',
      color: 'text-yellow-400'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Campaign Management',
      description: 'Automated ad campaign creation, monitoring, and optimization',
      color: 'text-red-400'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Audience Intelligence',
      description: 'Behavior analysis, segmentation, and personalization',
      color: 'text-indigo-400'
    }
  ]

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const newActions = [
        'Generating Instagram carousel post for product launch',
        'Analyzing Meta ad campaign performance',
        'Scheduling LinkedIn article for tomorrow 9 AM',
        'Creating Facebook event for webinar',
        'Optimizing ad spend across platforms',
        'Responding to comments with AI-generated replies',
        'Creating weekly performance report',
        'A/B testing ad creatives on Meta',
        'Identifying trending hashtags for Twitter',
        'Generating email newsletter content'
      ]

      const platforms = ['Meta', 'LinkedIn', 'Twitter', 'Instagram', 'Facebook']

      const newAction: AgentAction = {
        id: Date.now().toString(),
        type: 'automated',
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        action: newActions[Math.floor(Math.random() * newActions.length)],
        status: 'running',
        timestamp: new Date()
      }

      setActions(prev => {
        const updated = [newAction, ...prev]

        // Mark previous running actions as completed
        return updated.map((action, index) => {
          if (index > 0 && action.status === 'running') {
            return { ...action, status: 'completed' as const }
          }
          return action
        }).slice(0, 10) // Keep only last 10 actions
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="space-y-6">
      {/* Agent Capabilities Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Agent Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentCapabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className={`${capability.color} mb-3`}>
                {capability.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {capability.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Real-time Agent Activity</h2>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-white font-medium">
                {isRunning ? 'Agent is actively working...' : 'Agent is idle'}
              </span>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {actions.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                Start the agent to see real-time activity
              </div>
            ) : (
              actions.map((action) => (
                <div key={action.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-600/20 text-purple-300">
                          {action.platform}
                        </span>
                        <span
                          className={`inline-flex items-center space-x-1 text-xs ${
                            action.status === 'running'
                              ? 'text-yellow-400'
                              : action.status === 'completed'
                              ? 'text-green-400'
                              : 'text-gray-400'
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              action.status === 'running'
                                ? 'bg-yellow-400 animate-pulse'
                                : action.status === 'completed'
                                ? 'bg-green-400'
                                : 'bg-gray-400'
                            }`}
                          ></div>
                          <span className="capitalize">{action.status}</span>
                        </span>
                      </div>
                      <p className="text-white">{action.action}</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {action.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Agent Instructions */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
          <Brain className="w-5 h-5" />
          <span>How the Agent Works</span>
        </h3>
        <ul className="space-y-2 text-gray-200">
          <li className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Continuously monitors all connected platforms for engagement opportunities</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Generates content based on your brand voice, industry trends, and audience preferences</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Automatically schedules posts at optimal times for maximum engagement</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Analyzes performance metrics and adjusts strategy in real-time</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Manages ad campaigns with intelligent budget allocation and targeting</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
