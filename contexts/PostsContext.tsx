import React, { useEffect, useReducer } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { Post, PostsParams } from '../types/common';
import { getPosts } from '../utils/frontend/posts';

export enum Action {
  SET_POSTS = 'SET_POSTS',
  SET_POSTS_PARAMS = 'SET_POSTS_PARAMS',
}

export type IAction =
  | {
      type: Action.SET_POSTS;
      payload: Array<Post>;
    }
  | {
      type: Action.SET_POSTS_PARAMS;
      payload: PostsParams;
    };

export interface PostsState {
  posts: Array<Post>;
  postsParams: PostsParams;
}

export interface PostsContextValue {
  state: PostsState;
  dispatch: React.Dispatch<IAction>;
}

export interface SortItem {
  label: string;
  sort: (a: Post, b: Post) => number;
}

// Use generic function type to avoid using () => any
export type Selector<T> = (value: PostsContextValue) => T;

export const PostsContext = createContext({} as PostsContextValue);

const reducer = (state: PostsState, action: IAction) => {
  switch (action.type) {
    case Action.SET_POSTS:
      return { ...state, posts: action.payload };
    case Action.SET_POSTS_PARAMS:
      return { ...state, postsParams: action.payload };
    default:
      // throw new Error("Invalid reducer action");
      // Change IAction.payload to any if you want to enable error throwing
      return state;
  }
};

const initialData = {
  posts: [],
  postsParams: {
    type: '',
    categories: new Set<string>(),
    skillLevels: new Set<string>(),
    brands: new Set<string>(),
  } as PostsParams,
};

export const PostsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    (async () => {
      const { posts } = await getPosts({} as PostsParams);
      dispatch({ type: Action.SET_POSTS, payload: posts });
    })();
  }, [state.postsParams]);

  return (
    <PostsContext.Provider value={{ state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};

// Can't create generic arrow function in tsx
// so we use standard syntax
export function usePostsContext<T>(selector: Selector<T>) {
  return useContextSelector(PostsContext, selector);
}
