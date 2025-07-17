'use client'

import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TaskCard } from './TaskCard'
import { useEffect } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { update as updateTask } from '@/actions/taskActions'

export default function TaskBoard() {
  const tasks = useTaskStore((state) => state.tasks)
  console.log("🚀 ~ TaskBoard ~ tasks:", tasks)
  const setTasks = useTaskStore((state) => state.setTasks)
  const handleSync = async () => {
    try {
      const res = await fetch('/api/tasks/sync', { method: 'GET' })
      if (!res.ok) throw new Error('Sync failed')

        const tasks = await res.json()
        useTaskStore.getState().setTasks(tasks)
      
    } catch (e) {
    }
  }
  useEffect(() => {
    handleSync()
  }, [setTasks])

  const handleDragEnd = async (event: any) => {
    const { active, over } = event
    console.log("🚀 ~ handleDragEnd ~ over:", over)
    console.log("🚀 ~ handleDragEnd ~ active:", active)

    if (!over || active.id === over.id) return
    const task = tasks.find((t) => t.id === active.id)

    const oldStatus = task?.status
    const newStatus = over.status

    if (oldStatus === newStatus) return

    // const updatedTasks = tasks.map((task) =>
    //   task.id === active.id ? { ...task, status: newStatus } : task
    // )
    // console.log("🚀 ~ handleDragEnd ~ updatedTasks:", updatedTasks)
    const result = await updateTask({ id: task.id, title: task.title, status: newStatus })
    // setTasks(updatedTasks)

    // fetch('/api/tasks/update', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ taskId: active.id, status: newStatus }),
    // })
  }

  const tasksByColumn = {
    'To Do': tasks.filter((t) => t.status === 'To Do'),
    'In Progress': tasks.filter((t) => t.status === 'In Progress'),
    'Done': tasks.filter((t) => t.status === 'Done'),
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {(['To Do', 'In Progress', 'Done'] as const).map((column) => (
          <div key={column} className="bg-gray-100 p-4 rounded">
            <h3 className="capitalize font-semibold mb-2">{column}</h3>
            <SortableContext
              items={tasksByColumn[column].map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasksByColumn[column].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  )
}