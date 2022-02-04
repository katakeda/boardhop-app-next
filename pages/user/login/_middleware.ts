import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // TODO: If user is logged in redirect them to home
  const loggedIn = false;

  if (loggedIn) {
    return new Response('Authenticated', {
      status: 302,
      headers: {
        'location': '/',
      }
    })
  }

  return NextResponse.next();
}
