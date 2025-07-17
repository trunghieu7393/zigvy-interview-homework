import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

  return Response.json({ token:'asdasdsa' })
}