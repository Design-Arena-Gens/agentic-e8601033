'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle, Play, Trash2, Plus } from 'lucide-react'

interface Task {
  id: string
  title: string
  platform: string
  type: 'post' | 'ad' | 'analytics' | 'engagement' | 'report'
  status: 'pending' | 'running' | 'completed' | 'failed'
  scheduledFor: Date
  priority: 'high' | 'medium' | 'low'
}

interface TaskQueueProps {
  isRunning: boolean
  onStatsUpdate: (stats: any) => void
}

export default function TaskQueue({ isRunning, onStatsUpdate }: TaskQueueProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Post product launch announcement on LinkedIn',
      platform: 'LinkedIn',
      type: 'post',
      status: 'pending',
      scheduledFor: new Date(Date.now() + 3600000),
      priority: 'high'
    },
    {
      id: '2',
      title: 'Create Instagram story series for new feature',
      platform: 'Instagram',
      type: 'post',
      status: 'pending',
      scheduledFor: new Date(Date.now() + 7200000),
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Optimize Meta ad campaign targeting',
      platform: 'Meta',
      type: 'ad',
      status: 'pending',
      scheduledFor: new Date(Date.now() + 1800000),
      priority: 'high'
    },
    {
      id: '4',
      title: 'Generate weekly analytics report',
      platform: 'All Platforms',
      type: 'report',
      status: 'pending',
      scheduledFor: new Date(Date.now() + 10800000),
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Respond to comments and messages',
      platform: 'Meta',
      type: 'engagement',
      status: 'pending',
      scheduledFor: new Date(Date.now() + 900000),
      priority: 'low'
    }
  ])

  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTasks(prev => {
        const now = Date.now()
        let completedCount = 0

        const updated = prev.map(task => {
          if (task.status === 'pending' && task.scheduledFor.getTime() <= now) {
            // Simulate task execution
            if (Math.random() > 0.1) {
              completedCount++
              return { ...task, status: 'completed' as const }
            } else {
              return { ...task, status: 'failed' as const }
            }
          }
          return task
        })

        // Update stats
        const scheduled = updated.filter(t => t.status === 'pending').length
        onStatsUpdate((prev: any) => ({
          ...prev,
          tasksScheduled: scheduled
        }))

        return updated
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isRunning, onStatsUpdate])

  const addNewTask = () => {
    const taskTypes = ['post', 'ad', 'analytics', 'engagement', 'report'] as const
    const platforms = ['Meta', 'LinkedIn', 'Instagram', 'Twitter', 'Facebook']
    const priorities = ['high', 'medium', 'low'] as const

    const taskTitles = [
      'Create engaging carousel post',
      'Launch retargeting campaign',
      'Analyze competitor performance',
      'Schedule weekly content batch',
      'Design promotional graphics',
      'Update ad copy variations',
      'Monitor brand mentions',
      'Generate performance insights'
    ]

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitles[Math.floor(Math.random() * taskTitles.length)],
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
      status: 'pending',
      scheduledFor: new Date(Date.now() + Math.random() * 86400000),
      priority: priorities[Math.floor(Math.random() * priorities.length)]
    }

    setTasks(prev => [...prev, newTask])
    setShowAddTask(false)
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20'
      case 'running':
        return 'text-blue-400 bg-blue-400/20'
      case 'completed':
        return 'text-green-400 bg-green-400/20'
      case 'failed':
        return 'text-red-400 bg-red-400/20'
    }
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
    }
  }

  const getTypeIcon = (type: Task['type']) => {
    const icons = {
      post: '📝',
      ad: '📢',
      analytics: '📊',
      engagement: '💬',
      report: '📈'
    }
    return icons[type]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Automated Task Queue</h2>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Add New Task</h3>
            <p className="text-gray-300 mb-6">
              The AI agent will automatically generate and schedule a new marketing task.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={addNewTask}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Generate Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
          <p className="text-gray-300 text-sm mb-1">Total Tasks</p>
          <p className="text-2xl font-bold text-white">{tasks.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
          <p className="text-gray-300 text-sm mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">
            {tasks.filter(t => t.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
          <p className="text-gray-300 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-400">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
          <p className="text-gray-300 text-sm mb-1">Failed</p>
          <p className="text-2xl font-bold text-red-400">
            {tasks.filter(t => t.status === 'failed').length}
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden">
        <div className="divide-y divide-white/10">
          {tasks.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No tasks scheduled. Click "Add Task" to create one.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(task.type)}</span>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{task.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-400">{task.platform}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority} priority
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400 ml-11">
                      <Clock className="w-4 h-4" />
                      <span>
                        {task.status === 'pending'
                          ? `Scheduled for ${task.scheduledFor.toLocaleString()}`
                          : task.status === 'completed'
                          ? 'Completed'
                          : task.status === 'failed'
                          ? 'Failed - will retry'
                          : 'Running...'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
