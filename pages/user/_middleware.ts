import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // TODO: Authenticate user before passing request

  return NextResponse.next();
}
