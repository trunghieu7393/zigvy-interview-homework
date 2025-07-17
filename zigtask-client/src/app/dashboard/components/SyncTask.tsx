'use client'

import { useState } from 'react'

export default function SyncTask() {
  const [loading, setLoading] = useState(false)

  const handleSync = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/tasks/sync', { method: 'GET' })
      if (!res.ok) throw new Error('Sync failed')
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
