import type { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../../types/common'
import { generateMockPost } from '../../../utils/posts';

type Data = {
  posts: Array<Post>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const posts: Array<Post> = [
    generateMockPost(),
    generateMockPost(),
    generateMockPost(),
  ];

  res.status(200).json({ posts })
}