import type { NextApiRequest, NextApiResponse } from 'next';
import { MediaType, Post, PostMedia, User } from '../../../types/common';

type Data = {
  post: Post;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const options = { method: 'GET' };
  const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/posts/${req.query.id}`, options);
  const data = await response.json();

  const user: User = {
    id: data.userId,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarUrl: data.avatarUrl,
  }
  const media: PostMedia = {
    id: '',
    url: '',
    type: MediaType.IMAGE,
  }

  const post: Post = {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    rate: data.rate,
    pickupLocation: { latitude: data.pickupLatitude, longitude: data.pickupLongitude },
    medias: [media],
    createdAt: data.createdAt,
    user,
  }

  res.status(200).json({ post });
}

export default handler;