import type { NextApiRequest, NextApiResponse } from 'next';
import { FirebaseError } from 'firebase/app';
import { ResponseData } from '../../../types/common';
import { getAuthErrorMessage, logout } from '../../../utils/backend/firebase';
import { setApiCookie } from '../../../utils/backend/http';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
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
  setApiCookie(res, 'boardhop_auth', '', { expires: new Date(0) });

  return res.status(200).json({});
};

export default handler;
