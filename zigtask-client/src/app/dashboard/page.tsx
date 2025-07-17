import Header from './components/Header'
import TaskBoard from './components/TaskBoard'

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <main>
        <TaskBoard />
      </main>
    </div>
  )
}