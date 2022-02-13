import { NextRequest, NextResponse } from 'next/server';
import { getUserResponse } from '../../../utils/user';

export async function middleware(req: NextRequest) {
  const response = await getUserResponse(req);

  if (response.ok) {
    const data = await response.json();
    if (data && data.id) {
      return NextResponse.redirect('/user/settings');
    }
  }

  return NextResponse.next();
}
