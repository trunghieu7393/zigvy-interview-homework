export async function sync() {
  const res = await fetch('/api/tasks/sync', {
    method: 'GET',
  })

  if (!res.ok) throw new Error('Sync failed')
  const data = await res.json()
  return data
}
