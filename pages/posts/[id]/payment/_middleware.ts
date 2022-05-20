import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from '../../../../utils/backend/http';
import { APP_URL } from '../../../../utils/constants';
import { getUserResponse } from '../../../../utils/user';

export async function middleware(req: NextRequest) {
  const response = await getUserResponse(req);

  if (response.status >= 300) {
    const res = NextResponse.redirect(`${APP_URL}/user/login`);
    return setCookie(res, 'boardhop_post_login_url', req.url);
  }

  return NextResponse.next();
}
