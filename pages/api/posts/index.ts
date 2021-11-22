import type { NextApiRequest, NextApiResponse } from 'next'
import { MediaType, Post, PostMedia, User } from '../../../types/common'

type Data = {
  posts: Array<Post>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const url = process.env.BACKEND_API_ENDPOINT ?? '';
  const url = 'http://localhost:8080/posts';
  const options = { method: 'GET' };
  const response = await fetch(url, options);
  const results = await response.json();

  const posts = results.map((result: any): Post => {
    const user: User = {
      id: result.userId,
      username: result.username,
      avatarUrl: result.avatarUrl,
    }
    const media: PostMedia = {
      id: '',
      url: '',
      type: MediaType.IMAGE,
    }

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      price: result.price,
      rate: result.rate,
      pickupLocation: { latitude: result.pickupLatitude, longitude: result.pickupLongitude },
      medias: [media],
      createdAt: result.createdAt,
      user,
    }
  })

  res.status(200).json({ posts })
}