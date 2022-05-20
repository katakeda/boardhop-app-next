import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const defaultCookieOptions = {
  path: '/',
  expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const methodNotAllowed = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(405).send('Method not allowed');
};

export const setCookie = (
  res: NextResponse,
  key: string,
  value: string,
  options: CookieSerializeOptions = {}
): NextResponse => {
  return res.cookie(key, value, { ...defaultCookieOptions, ...options });
};

export const setApiCookie = (
  res: NextApiResponse,
  key: string,
  value: string,
  options: CookieSerializeOptions = {}
): NextApiResponse => {
  return res.setHeader(
    'Set-Cookie',
    serialize(key, value, { ...defaultCookieOptions, ...options })
  );
};
