'use client'

import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TaskCard } from './TaskCard'
import { useEffect, useState } from 'react'

export default function TaskBoard() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [])

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldStatus = tasks.find((t) => t.id === active.id)?.status
    const newStatus = over.id

    if (oldStatus === newStatus) return

    const updatedTasks = tasks.map((task) =>
      task.id === active.id ? { ...task, status: newStatus } : task
    )

    setTasks(updatedTasks)

    // Gửi cập nhật lên server
    fetch('/api/tasks/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId: active.id, status: newStatus }),
    })
  }

  const tasksByColumn = {
    todo: tasks.filter((t) => t.status === 'todo'),
    inprogress: tasks.filter((t) => t.status === 'inprogress'),
    done: tasks.filter((t) => t.status === 'done'),
  }

  const refreshTasks = () => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {(['todo', 'inprogress', 'done'] as const).map((column) => (
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