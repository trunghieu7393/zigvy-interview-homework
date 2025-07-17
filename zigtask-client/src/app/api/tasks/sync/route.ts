import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const response = await axios.get(
      'http://localhost:5000/tasks',
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
