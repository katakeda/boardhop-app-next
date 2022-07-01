import React from 'react';
import { useRouter } from 'next/router';
import { DropdownMenu } from '../Common/DropdownMenu';

export const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center h-main">
      <div className="flex flex-col py-2 px-4 w-full h-full items-center justify-center">
        <p className="font-sans text-lg my-3">カテゴリーを選択してください</p>
        <DropdownMenu
          label="カテゴリーを選択"
          items={[
            {
              label: 'サーフボード',
              action: () =>
                router.push({
                  pathname: '/posts',
                  query: { type: 'surfboards' },
                }),
            },
            {
              label: 'スノーボード',
              action: () =>
                router.push({
                  pathname: '/posts',
                  query: { type: 'snowboards' },
                }),
            },
          ]}
        />
      </div>
    </div>
  );
};
