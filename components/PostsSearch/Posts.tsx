import React from 'react';
import { usePostsContext } from '../../contexts/PostsContext';
import { Post as PostType } from '../../types/common';
import { Post } from './Post';

interface PostsProps {}

export const Posts: React.FC<PostsProps> = () => {
  const posts = usePostsContext((value) => value.state.posts);

  return (
    <div className="flex flex-col gap-4 w-full">
      {posts.length > 0
        ? posts.map((post: PostType, index: number) => (
          <Post key={index} post={post} />
        ))
        : <div className="w-full text-center text-gray-500">
          <p>検索結果が見つかりませんでした</p>
        </div>
      }
    </div>
  );
}