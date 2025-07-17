'use client'
import { useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { sync as syncTasks } from '@/actions/taskActions'

export default function SyncTask() {
  const [loading, setLoading] = useState(false)

  const handleSync = async () => {
    setLoading(true)
    try {
        const tasks = await syncTasks()
        useTaskStore.getState().setTasks(tasks)
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSync}
      disabled={loading}
      className="ml-4 px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? 'Syncing...' : 'Sync'}
    </button>
  )
}
