import React, { useContext, createContext, useState } from 'react'
import useSWR, { Key, SWRResponse } from 'swr';
import { PickupLocation, Post, PostsParams } from '../types/common';
import { asyncRequest } from '../utils/common';
import { GET_POSTS_API_ENDPOINT } from '../utils/constants';
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