import type { NextApiRequest, NextApiResponse } from 'next';
import {
  MediaType,
  Post,
  PostMedia,
  ResponseData,
  User,
} from '../../../types/common';

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

  const results = await response.json();

  const posts = results.map(convertResponseDataToPost);

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

  const responseData = await response.json();

  return res
    .status(200)
    .json({ post: convertResponseDataToPost(responseData) });
};

const convertResponseDataToPost = (data: any): Post => {
  const user: User = {
    id: data.userId,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarUrl: data.avatarUrl,
  };
  const media: PostMedia = {
    id: '',
    url: '',
    type: MediaType.IMAGE,
  };

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    rate: data.rate,
    pickupLocation: {
      latitude: data.pickupLatitude,
      longitude: data.pickupLongitude,
    },
    medias: [media],
    createdAt: data.createdAt,
    user,
  };
};

export default handler;
