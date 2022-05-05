import React, { useState } from 'react';
import { DropdownMenu } from '../Common/DropdownMenu';
import { PostNewDetail } from './PostNewDetail';

interface PostNewProps {}

export const PostNew: React.FC<PostNewProps> = () => {
  const [rootCategory, setRootCategory] = useState<string | null>(null);

  const handleRootCategoryChange = (category: string | null) => {
    setRootCategory(category);
  };

  return (
    <div className="flex items-center h-main">
      {rootCategory === null && (
        <div className="flex flex-col py-2 px-4 w-full h-full items-center justify-center">
          <p className="font-sans text-lg my-3">
            貸し出したいカテゴリーを選択してください
          </p>
          <DropdownMenu
            label="カテゴリーを選択"
            items={[
              {
                label: 'サーフボード',
                action: () => handleRootCategoryChange('surfboard'),
              },
              {
                label: 'スノーボード',
                action: () => handleRootCategoryChange('snowboard'),
              },
            ]}
          />
        </div>
      )}
      {rootCategory !== null && (
        <PostNewDetail
          rootCategory={rootCategory}
          goBack={() => handleRootCategoryChange(null)}
        />
      )}
    </div>
  );
};
