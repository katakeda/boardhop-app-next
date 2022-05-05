import React, { useState } from 'react';
import { FilterMenu } from './FilterMenu';
import { Posts } from './Posts';

interface PostsSearchProps {}

export const PostsSearch: React.FC<PostsSearchProps> = () => {
  const [filterMenu, setFilterMenu] = useState<boolean>(false);

  const toggleFilterMenu = () => setFilterMenu((prev) => !prev);

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-evenly my-3">
        <span>
          <button
            className="py-2 px-3 bg-green-600 text-white rounded-md"
            onClick={toggleFilterMenu}
          >
            Filter
          </button>
        </span>
        <span>
          <button
            className="py-2 px-3 bg-green-600 text-white rounded-md"
            onClick={() => {}}
          >
            View
          </button>
        </span>
        <span>
          <button
            className="py-2 px-3 bg-green-600 text-white rounded-md"
            onClick={() => {}}
          >
            Map
          </button>
        </span>
      </div>

      {filterMenu && <FilterMenu />}

      <Posts />
    </div>
  );
};
