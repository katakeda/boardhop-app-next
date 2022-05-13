import type { NextApiRequest, NextApiResponse } from 'next';
import { Post, ResponseData } from '../../../types/common';

type GetData = {
  post: Post | null;
} & ResponseData;

const handler = async (req: NextApiRequest, res: NextApiResponse<GetData>) => {
  const options = { method: 'GET' };
  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/posts/${req.query.id}`,
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ post: null, error: response.statusText });
  }

  const post = await response.json();

  res.status(200).json({ post });
};

export default handler;
