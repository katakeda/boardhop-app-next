import React from 'react';
import { SortItem, usePostsContext } from '../../contexts/PostsContext';
import { Post as PostType } from '../../types/common';
import { Post } from './Post';

export const Posts: React.FC<{
  sortItem: SortItem;
}> = ({ sortItem }) => {
  const posts = usePostsContext((value) => value.state.posts);

  if (posts.length <= 0) {
    return (
      <div className="w-full text-center text-gray-500">
        <p>検索結果が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {posts.sort(sortItem.sort).map((post: PostType, index: number) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};
