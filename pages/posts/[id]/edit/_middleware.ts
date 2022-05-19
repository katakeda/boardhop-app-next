import { NextRequest, NextResponse } from 'next/server';
import { APP_URL } from '../../../../utils/constants';
import { getUserResponse } from '../../../../utils/user';

export async function middleware(req: NextRequest) {
  const response = await getUserResponse(req);

  if (response.status >= 300) {
    return NextResponse.redirect(`${APP_URL}/user/login`);
  }

  return NextResponse.next();
}
