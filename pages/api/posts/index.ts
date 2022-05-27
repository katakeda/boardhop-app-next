import type { NextApiRequest, NextApiResponse } from 'next';
import { Post, ResponseData } from '../../../types/common';

type GetData = {
  posts: Array<Post>;
} & ResponseData;

type PostData = {
  post: Post | null;
} & ResponseData;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    case 'GET':
    default:
      return handleGet(req, res);
  }
};

const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse<GetData>
) => {
  let queryArr: Array<string> = [];
  if (req.query.tags) {
    queryArr.push(`tags=${req.query.tags}`);
  }
  if (req.query.cats) {
    queryArr.push(`cats=${req.query.cats}`);
  }
  if (req.query.uid) {
    queryArr.push(`uid=${req.query.uid}`);
  }
  const options = { method: 'GET' };
  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/posts?${queryArr.join('&')}`,
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ posts: [], error: response.statusText });
  }

  const posts = await response.json();

  return res.status(200).json({ posts });
};

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<PostData>
) => {
  const options = {
    method: 'POST',
    headers: {
      'Accept-Encoding': req.headers['accept-encoding'],
      'Cache-Control': req.headers['cache-control'],
      'Content-Type': req.headers['content-type'],
    },
    body: req.body,
  };

  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/posts`,
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
