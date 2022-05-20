import type { NextApiRequest, NextApiResponse } from 'next';
import { FirebaseError } from 'firebase/app';
import { ResponseData, User } from '../../../types/common';
import { getAuthErrorMessage, signup } from '../../../utils/backend/firebase';
import { setApiCookie } from '../../../utils/backend/http';

type Data = {
  user: User | null;
} & ResponseData;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body;

  let userCredential;

  try {
    userCredential = await signup({ email, password });
  } catch (error) {
    let message = 'Authentication error';
    if (error instanceof FirebaseError) {
      message = getAuthErrorMessage(error);
    }
    return res.status(400).json({ user: null, error: message });
  }

  const { user } = userCredential;

  // FIXME: Not good practice to store JWT token in cookie
  const idToken = await user.getIdToken();
  setApiCookie(res, 'boardhop_auth', idToken);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...req.body, googleAuthId: user.uid }),
  };

  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/user/signup`,
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ user: null, error: response.statusText });
  }

  const responseData = await response.json();

  return res
    .status(200)
    .json({ user: convertResponseDataToUser(responseData) });
};

const convertResponseDataToUser = (data: any): User => {
  return {
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarUrl: data.avatarUrl,
  };
};

export default handler;
