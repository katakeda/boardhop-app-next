import React, { BaseSyntheticEvent, useState } from 'react';
import { NewPostDetail } from './NewPostDetail';

interface NewPostProps { }

export const NewPost: React.FC<NewPostProps> = () => {
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
        <NewPostDetail rootCategory={rootCategory} />
      )}
    </div>
  );
}