'use client'

import { useState, useEffect } from 'react'
import { Brain, Zap, TrendingUp, Clock, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react'
import AgentDashboard from './components/AgentDashboard'
import TaskQueue from './components/TaskQueue'
import PlatformConnections from './components/PlatformConnections'
import Analytics from './components/Analytics'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAgentRunning, setIsAgentRunning] = useState(false)
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    tasksScheduled: 0,
    activePlatforms: 0,
    engagement: 0
  })

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      if (isAgentRunning) {
        setStats(prev => ({
          ...prev,
          tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 3),
          engagement: Math.min(100, prev.engagement + Math.random() * 5)
        }))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isAgentRunning])

  const toggleAgent = () => {
    setIsAgentRunning(!isAgentRunning)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Agentic Marketing AI</h1>
            </div>

            <button
              onClick={toggleAgent}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isAgentRunning
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isAgentRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause Agent</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start Agent</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Tasks Completed</p>
                <p className="text-3xl font-bold text-white">{stats.tasksCompleted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Tasks Scheduled</p>
                <p className="text-3xl font-bold text-white">{stats.tasksScheduled}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Platforms</p>
                <p className="text-3xl font-bold text-white">{stats.activePlatforms}</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Engagement Rate</p>
                <p className="text-3xl font-bold text-white">{stats.engagement.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 border-b border-white/10">
          {['dashboard', 'tasks', 'platforms', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <AgentDashboard isRunning={isAgentRunning} />}
        {activeTab === 'tasks' && <TaskQueue isRunning={isAgentRunning} onStatsUpdate={setStats} />}
        {activeTab === 'platforms' && <PlatformConnections onStatsUpdate={setStats} />}
        {activeTab === 'analytics' && <Analytics />}
      </main>

      {/* Status Indicator */}
      {isAgentRunning && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="font-medium">Agent Active</span>
        </div>
      )}
    </div>
  )
}
