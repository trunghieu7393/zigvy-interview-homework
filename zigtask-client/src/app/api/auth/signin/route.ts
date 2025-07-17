import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  try {
    const response = await axios.post('http://localhost:5000/auth/signin', {
      email,
      password,
    });

    return Response.json(response.data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data || 'Internal Server Error' },
      { status: error?.response?.status || 500 }
    );
  }
};
