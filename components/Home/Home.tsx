import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 h-full">
      <div className="flex flex-col justify-center items-center gap-10 px-3 w-full h-full">
        <Link href="/posts?type=surfboards" passHref>
          <span className="flex justify-center items-center relative">
            <p className="flex justify-center items-center absolute inset-0 text-3xl text-gray-100 z-10">Surfboards</p>
            <Image className="rounded-3xl" src="/img/home-surfing.jpg" alt="home-surfing" width="250" height="250" />
          </span>
        </Link>
        <Link href="/posts?type=snowboards" passHref>
          <span className="flex justify-center items-center relative">
            <p className="flex justify-center items-center absolute inset-0 text-3xl text-gray-100 z-10">Snowboards</p>
            <Image className="rounded-xl w-full" src="/img/home-snowboarding.jpg" alt="home-snowboarding" width="250" height="250" />
          </span>
        </Link>
      </div>
    </div>
  );
}