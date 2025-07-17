import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newTask = {
    id: Math.random().toString(36).substring(2, 9),
    ...body,
  }

    try {
    const token = req.cookies.get('token')?.value;
    const response = await axios.post(
      'http://localhost:5000/tasks',
      newTask,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      }
    );

    return Response.json(response.data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data || 'Internal Server Error' },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()

    try {
    const token = req.cookies.get('token')?.value;
    const response = await axios.post(
      'http://localhost:5000/tasks',
      body,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      }
    );

    return Response.json(response.data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data || 'Internal Server Error' },
      { status: error?.response?.status || 500 }
    );
  }
}
