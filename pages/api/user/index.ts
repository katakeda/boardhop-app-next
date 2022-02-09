import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData, User } from '../../../types/common';

type Data = {
  user: User | null;
} & ResponseData;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.cookies.boardhopauth}`
    },
  }

  const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/user`, options);

  if (response.status >= 400) {
    return res.status(response.status).json({ user: null, error: response.statusText });
  }

  const responseData = await response.json();

  return res.status(200).json({ user: convertResponseDataToUser(responseData) });
}

const convertResponseDataToUser = (data: any): User => {
  return {
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarUrl: data.avatarUrl,
  }
}

export default handler;