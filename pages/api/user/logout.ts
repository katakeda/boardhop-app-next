import { CookieSerializeOptions, serialize } from 'cookie';
import { FirebaseError } from 'firebase/app';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../types/common';
import { getAuthErrorMessage, logout } from '../../../utils/backend/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    await logout();
  } catch (error) {
    let message = 'Logout error';
    if (error instanceof FirebaseError) {
      message = getAuthErrorMessage(error);
    }
    return res.status(400).json({ error: message });
  }

  // FIXME: Not good practice to store JWT token in cookie
  const cookieOptions: CookieSerializeOptions = {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
  }
  res.setHeader("Set-Cookie", serialize("boardhopauth", '', cookieOptions));

  return res.status(200).json({});
}

export default handler;