import { NextRequest } from 'next/server'

let tasks: any[] = []

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newTask = {
    id: Math.random().toString(36).substring(2, 9),
    ...body,
  }

  tasks.push(newTask)

  return Response.json(newTask)
}

export async function GET() {
  return Response.json(tasks)
}