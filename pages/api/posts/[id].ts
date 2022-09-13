import type { NextApiRequest, NextApiResponse } from 'next';
import { Post, ResponseData } from '../../../types/common';

type GetData = {
  post: Post | null;
} & ResponseData;

type PatchData = {
  post: Post | null;
} & ResponseData;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  switch (req.method) {
    case 'PATCH':
      return handlePatch(req, res);
    case 'GET':
    default:
      return handleGet(req, res);
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse<GetData>) => {
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

const handlePatch = async (
  req: NextApiRequest,
  res: NextApiResponse<PatchData>
) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Accept-Encoding': req.headers['accept-encoding'],
      'Cache-Control': req.headers['cache-control'],
      'Content-Type': req.headers['content-type'],
      Authorization: `Bearer ${req.cookies.boardhop_auth}`,
    },
    body: JSON.stringify(req.body),
  };

  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/posts/${req.query.id}`,
    // @ts-ignore
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ post: null, error: response.statusText });
  }

  const post = await response.json();

  return res.status(200).json({ post });
};

export default handler;
