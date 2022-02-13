import { NextRequest, NextResponse } from 'next/server';
import { getUserResponse } from '../../../utils/user';

export async function middleware(req: NextRequest) {
  const response = await getUserResponse(req);

  if (response.status >= 300) {
    return NextResponse.redirect('/user/login');
  }

  return NextResponse.next();
}
