export async function sync() {
  const res = await fetch('/api/tasks/sync', {
    method: 'GET',
  })

  if (!res.ok) throw new Error('Sync failed')
  const data = await res.json()
  return data
}

export async function create({ title, description, due }: { title: string; description?: string; due?: string }) {
  const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, due }),
    })

  if (!res.ok) throw new Error('Sync failed')
  return res
}