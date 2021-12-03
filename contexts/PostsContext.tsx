import React, { createContext, useContext, useState } from 'react';
import { Post, PostsParams } from '../types/common';
import { useGetPosts } from '../utils/posts';

interface PostsData {
  posts: Array<Post>;
  isLoading: boolean;
  isError: boolean;
  postsParams: PostsParams;
  updatePostsParams: (postsParams: PostsParams) => void;
}

const PostsContext: React.Context<PostsData> = createContext({} as PostsData);

export const PostsProvider: React.FC = ({ children }) => {
  const [postsParams, setPostsParams] = useState<PostsParams>({} as PostsParams);
  const { posts, isLoading, isError } = useGetPosts(postsParams);

  const updatePostsParams = (postsParams: PostsParams): void => setPostsParams({ ...postsParams });

  const initialData: PostsData = {
    posts,
    isLoading,
    isError,
    postsParams,
    updatePostsParams,
  }

  return (
    <PostsContext.Provider value={initialData}>
      {children}
    </PostsContext.Provider>
  )
}

export const usePostsContext = () => useContext(PostsContext);