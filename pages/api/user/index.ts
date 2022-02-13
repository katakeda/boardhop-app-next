import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData, User } from '../../../types/common';
import { getUserResponse } from '../../../utils/user';

type Data = {
  user: User | null;
} & ResponseData;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await getUserResponse(req);

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