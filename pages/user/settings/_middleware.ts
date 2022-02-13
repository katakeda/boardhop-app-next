import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.cookies.boardhopauth}`
    },
  }

  const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/user`, options);

  if (response.status >= 300) {
    return NextResponse.redirect('/user/login');
  }

  return NextResponse.next();
}
