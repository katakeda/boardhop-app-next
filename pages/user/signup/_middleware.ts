import { NextRequest, NextResponse } from 'next/server';
import { APP_URL } from '../../../utils/constants';
import { getUserResponse } from '../../../utils/user';

export async function middleware(req: NextRequest) {
  const response = await getUserResponse(req);

  if (response.ok) {
    const data = await response.json();
    if (data && data.id) {
      return NextResponse.redirect(`${APP_URL}/user/dashboard`);
    }
  }

  return NextResponse.next();
}
