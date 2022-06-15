import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="flex justify-center items-center h-main">
      <div className="flex flex-col gap-10 w-full h-full">
        <Link href="/posts?type=surfboards" passHref>
          <span className="flex justify-center items-center relative">
            <p className="flex justify-center items-center absolute inset-0 text-3xl text-gray-100 z-10">
              サーフボード
            </p>
            <Image
              className="rounded-3xl"
              src="/img/home-surfing.jpg"
              alt="home-surfing"
              width="250"
              height="250"
            />
          </span>
        </Link>
        <Link href="/posts?type=snowboards" passHref>
          <span className="flex justify-center items-center relative">
            <p className="flex justify-center items-center absolute inset-0 text-3xl text-gray-900 z-10">
              スノーボード
            </p>
            <Image
              className="rounded-xl w-full"
              src="/img/home-snowboarding.jpg"
              alt="home-snowboarding"
              width="250"
              height="250"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};
