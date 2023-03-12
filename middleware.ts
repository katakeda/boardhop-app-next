import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from './utils/backend/http';
import { APP_URL } from './utils/constants';
import { getUserResponse } from './utils/user';

export async function middleware(req: NextRequest) {
  const response = await getUserResponse(req);

  switch (true) {
    case !!req.nextUrl.pathname.match(/\/user\/login/i):
    case !!req.nextUrl.pathname.match(/\/user\/signup/i):
      if (response.ok) {
        const data = await response.json();
        if (data && data.id) {
          return NextResponse.redirect(`${APP_URL}/user/dashboard`);
        }
      }
      break;
    case !!req.nextUrl.pathname.match(/\/user\/dashboard/i):
    case !!req.nextUrl.pathname.match(/\/user\/receipts/i):
    case !!req.nextUrl.pathname.match(/\/posts\/([a-z0-9\-]+)\/edit/i):
    case !!req.nextUrl.pathname.match(/\/posts\/([a-z0-9\-]+)\/payment/i):
    case !!req.nextUrl.pathname.match(/\/posts\/new/i):
      if (response.status >= 300) {
        const res = NextResponse.redirect(`${APP_URL}/user/login`);
        return setCookie(res, 'boardhop_post_login_url', req.url);
      }
      break;
    default:
      break;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|img|favicon.ico).*)'],
};
