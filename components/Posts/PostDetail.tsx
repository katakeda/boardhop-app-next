import React from 'react';
import { useRouter } from 'next/router';
import { useGetPost } from '../../utils/posts';

interface PostDetailProps {}

export const PostDetail: React.FC<PostDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { post, isLoading, isError } = useGetPost(id);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <>
      <p>PostDetail</p>
      <p>{post.title}</p>
    </>
  );
}