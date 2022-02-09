import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // TODO: Authenticate user before passing request
  // We will call firebase to check if cookie token is valid
  // If token is valid then request will be processed, however
  // it still may fail to fetch user data from server.
  // In that case, the page must redirect to login/signup page.

  return NextResponse.next();
}
