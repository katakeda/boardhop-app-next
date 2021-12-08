import type { NextApiRequest, NextApiResponse } from 'next';
import { MediaType, Post, PostMedia, User } from '../../../types/common';

type Data = {
  post: Post;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const options = { method: 'GET' };
  const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/posts/${req.query.id}`, options);
  const results = await response.json();

  const user: User = {
    id: results.userId,
    username: results.username,
    avatarUrl: results.avatarUrl,
  }
  const media: PostMedia = {
    id: '',
    url: '',
    type: MediaType.IMAGE,
  }

  const post: Post = {
    id: results.id,
    title: results.title,
    description: results.description,
    price: results.price,
    rate: results.rate,
    pickupLocation: { latitude: results.pickupLatitude, longitude: results.pickupLongitude },
    medias: [media],
    createdAt: results.createdAt,
    user,
  }

  res.status(200).json({ post });
}

export default handler;