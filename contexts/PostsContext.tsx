import React, { createContext, useContext, useState } from 'react';
import { PostsParams } from '../types/common';
import { useAppContext } from './AppContext';

interface PostsData {
  postsParams: PostsParams;
  updatePostsParams: (postsParams: PostsParams) => void;
}

const PostsContext: React.Context<PostsData> = createContext({} as PostsData);

export const PostsProvider: React.FC = ({ children }) => {
  const [postsParams, setPostsParams] = useState<PostsParams>({} as PostsParams);
  const { toggleLoading, toggleError } = useAppContext();

  const updatePostsParams = (postsParams: PostsParams): void => setPostsParams({ ...postsParams });

  const initialData: PostsData = {
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