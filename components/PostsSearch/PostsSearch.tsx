import React, { useState } from 'react';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { SortItem } from '../../contexts/PostsContext';
import { Post } from '../../types/common';
import { DropdownMenu } from '../Common/DropdownMenu';
import { FilterMenu } from './FilterMenu';
import { Posts } from './Posts';

const sortItems: Array<SortItem> = [
  {
    label: '日付順 (新)',
    sort: (a: Post, b: Post) => (a.createdAt < b.createdAt ? 1 : -1),
  },
  {
    label: '日付順 (古)',
    sort: (a: Post, b: Post) => (a.createdAt > b.createdAt ? 1 : -1),
  },
  { label: '金額順 (低い)', sort: (a: Post, b: Post) => a.price - b.price },
  { label: '金額順 (高い)', sort: (a: Post, b: Post) => b.price - a.price },
];

export const PostsSearch: React.FC = () => {
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [sortItem, setSortItem] = useState<SortItem>(sortItems[0]);

  const toggleFilterMenu = () => setFilterMenu((prev) => !prev);

  return (
    <div className="flex flex-col">
      <div className="px-4">
        <div className="flex w-full my-3 space-x-5 justify-end">
          <DropdownMenu
            items={sortItems.map((item) => ({
              label: item.label,
              action: () => setSortItem(item),
            }))}
            label={sortItem.label}
          />
          <span
            className="p-2 w-10 h-10 rounded-md border border-gray-300"
            onClick={toggleFilterMenu}
          >
            <AdjustmentsIcon className="w-full aspect-square" />
          </span>
        </div>

        {filterMenu && <FilterMenu />}

        <Posts sortItem={sortItem} />
      </div>
    </div>
  );
};
