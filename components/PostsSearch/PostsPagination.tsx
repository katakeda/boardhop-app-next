import React from 'react';
import { Action, usePostsContext } from '../../contexts/PostsContext';
import { DropdownMenu } from '../Common/DropdownMenu';

const PaginationBox: React.FC<{ item: string | number }> = ({ item }) => {
  return (
    <span className="flex justify-center items-center px-2 py-1 rounded-md shadow-sm border border-gray-300">
      {item}
    </span>
  );
};

export const PostsPagination: React.FC = () => {
  const postsParams = usePostsContext((value) => value.state.postsParams);
  const dispatch = usePostsContext((value) => value.dispatch);

  return (
    <div className="grid grid-cols-2 my-4">
      <div className="flex justify-start">
        <DropdownMenu label="Show 50" items={[]} />
      </div>
      <div className="flex justify-end">
        <div className="flex space-x-2">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <span
                key={index}
                onClick={() => {
                  dispatch({
                    type: Action.SET_POSTS_PARAMS,
                    payload: { ...postsParams, page: index },
                  });
                }}
              >
                <PaginationBox item={index + 1} />
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
