import React, { BaseSyntheticEvent, useState } from 'react';
import { PostNewDetail } from './PostNewDetail';

interface PostNewProps { }

export const PostNew: React.FC<PostNewProps> = () => {
  const [rootCategory, setRootCategory] = useState<string | null>(null);

  const handleRootCategoryChange = (event: BaseSyntheticEvent) => {
    setRootCategory(event.currentTarget.value);
  }

  return (
    <div className="flex flex-col w-full h-full">
      {rootCategory === null && (
        <div className="flex flex-col py-2 px-4 w-full">
          <p>カテゴリーを選択:</p>
          <select onChange={handleRootCategoryChange}>
            <option defaultChecked></option>
            <option value="surfboard">サーフボード</option>
            <option value="snowboard">スノーボード</option>
          </select>
        </div>
      )}
      {rootCategory !== null && (
        <PostNewDetail rootCategory={rootCategory} />
      )}
    </div>
  );
}