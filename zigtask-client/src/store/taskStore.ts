import { create } from 'zustand'

export type Task = {
  id: string
  title: string
  description?: string
  status: 'todo' | 'inprogress' | 'done'
}

type TaskStore = {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  updateTaskStatus: (taskId: string, status: Task['status']) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => set({ tasks }),
  updateTaskStatus: (taskId: string, status: Task['status']) =>
    set((state) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    })),
}))
