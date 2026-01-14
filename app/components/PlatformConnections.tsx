'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Settings, RefreshCw } from 'lucide-react'

interface Platform {
  id: string
  name: string
  icon: string
  connected: boolean
  lastSync: Date | null
  metrics: {
    posts: number
    engagement: number
    followers: number
  }
}

interface PlatformConnectionsProps {
  onStatsUpdate: (stats: any) => void
}

export default function PlatformConnections({ onStatsUpdate }: PlatformConnectionsProps) {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'meta',
      name: 'Meta Business Suite',
      icon: '📘',
      connected: true,
      lastSync: new Date(),
      metrics: {
        posts: 47,
        engagement: 8234,
        followers: 15420
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      connected: true,
      lastSync: new Date(),
      metrics: {
        posts: 32,
        engagement: 5621,
        followers: 8930
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      connected: true,
      lastSync: new Date(),
      metrics: {
        posts: 89,
        engagement: 12456,
        followers: 23450
      }
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      icon: '🐦',
      connected: false,
      lastSync: null,
      metrics: {
        posts: 0,
        engagement: 0,
        followers: 0
      }
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      connected: false,
      lastSync: null,
      metrics: {
        posts: 0,
        engagement: 0,
        followers: 0
      }
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '▶️',
      connected: false,
      lastSync: null,
      metrics: {
        posts: 0,
        engagement: 0,
        followers: 0
      }
    },
    {
      id: 'google-ads',
      name: 'Google Ads',
      icon: '🎯',
      connected: false,
      lastSync: null,
      metrics: {
        posts: 0,
        engagement: 0,
        followers: 0
      }
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: '📌',
      connected: false,
      lastSync: null,
      metrics: {
        posts: 0,
        engagement: 0,
        followers: 0
      }
    }
  ])

  useEffect(() => {
    const connectedCount = platforms.filter(p => p.connected).length
    onStatsUpdate((prev: any) => ({
      ...prev,
      activePlatforms: connectedCount
    }))
  }, [platforms, onStatsUpdate])

  const toggleConnection = (id: string) => {
    setPlatforms(prev =>
      prev.map(platform => {
        if (platform.id === id) {
          const newConnected = !platform.connected
          return {
            ...platform,
            connected: newConnected,
            lastSync: newConnected ? new Date() : null,
            metrics: newConnected
              ? {
                  posts: Math.floor(Math.random() * 100),
                  engagement: Math.floor(Math.random() * 20000),
                  followers: Math.floor(Math.random() * 30000)
                }
              : { posts: 0, engagement: 0, followers: 0 }
          }
        }
        return platform
      })
    )
  }

  const syncPlatform = (id: string) => {
    setPlatforms(prev =>
      prev.map(platform =>
        platform.id === id && platform.connected
          ? { ...platform, lastSync: new Date() }
          : platform
      )
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Platform Connections</h2>
        <p className="text-gray-300">
          Connect your marketing platforms to enable AI automation
        </p>
      </div>

      {/* Connection Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
          <p className="text-gray-300 text-sm mb-1">Connected Platforms</p>
          <p className="text-3xl font-bold text-green-400">
            {platforms.filter(p => p.connected).length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
          <p className="text-gray-300 text-sm mb-1">Total Posts</p>
          <p className="text-3xl font-bold text-white">
            {platforms.reduce((sum, p) => sum + p.metrics.posts, 0)}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
          <p className="text-gray-300 text-sm mb-1">Total Engagement</p>
          <p className="text-3xl font-bold text-purple-400">
            {platforms.reduce((sum, p) => sum + p.metrics.engagement, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`bg-white/5 backdrop-blur-lg rounded-lg p-6 border transition-all ${
              platform.connected
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{platform.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {platform.name}
                  </h3>
                  {platform.connected && platform.lastSync && (
                    <p className="text-sm text-gray-400">
                      Last sync: {platform.lastSync.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {platform.connected ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>

            {platform.connected && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Posts</p>
                  <p className="text-lg font-bold text-white">
                    {platform.metrics.posts}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Engagement</p>
                  <p className="text-lg font-bold text-white">
                    {platform.metrics.engagement.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Followers</p>
                  <p className="text-lg font-bold text-white">
                    {platform.metrics.followers.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => toggleConnection(platform.id)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  platform.connected
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {platform.connected ? 'Disconnect' : 'Connect'}
              </button>
              {platform.connected && (
                <>
                  <button
                    onClick={() => syncPlatform(platform.id)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    title="Sync now"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Instructions */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-lg p-6 border border-blue-500/30">
        <h3 className="text-lg font-semibold text-white mb-3">
          How Platform Integration Works
        </h3>
        <div className="space-y-2 text-gray-200">
          <p>
            <strong className="text-white">OAuth Authentication:</strong> Securely connect using official platform APIs
          </p>
          <p>
            <strong className="text-white">Real-time Sync:</strong> Automatic synchronization of posts, metrics, and audience data
          </p>
          <p>
            <strong className="text-white">AI Automation:</strong> Once connected, the agent can create, schedule, and optimize content
          </p>
          <p className="text-sm text-gray-300 mt-4">
            Note: This demo simulates platform connections. In production, you would integrate with actual platform APIs (Meta Graph API, LinkedIn Marketing API, etc.)
          </p>
        </div>
      </div>
    </div>
  )
}
