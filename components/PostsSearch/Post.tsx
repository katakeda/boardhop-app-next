import React from 'react';
import { PhotographIcon } from '@heroicons/react/outline';
import UserIcon from '@heroicons/react/outline/UserIcon';
import Image from 'next/image';
import { MediaType, Post as PostType } from '../../types/common';
import { RateMap } from '../../utils/constants';

export const Post: React.FC<{
  post: PostType;
}> = ({ post }) => {
  let topImageUrl;
  if (post.medias && post.medias.length > 0) {
    const [topImage] = post.medias.filter(
      (media) => media.type === MediaType.IMAGE
    );
    topImageUrl = topImage.url;
  }

  return (
    <div
      key={post.id}
      className="flex flex-col bg-white shadow-lg rounded-lg divide-y-2 w-full h-64"
    >
      <div className="relative w-full h-3/4">
        {!topImageUrl && (
          <div className="flex flex-col justify-center items-center w-full h-full text-white bg-gray-700 rounded-t-lg">
            <PhotographIcon className="h-16 w-16" />
            <p>No image found</p>
          </div>
        )}
        {topImageUrl && (
          <Image
            className="rounded-t-lg"
            src={`https://firebasestorage.googleapis.com/v0/b/boardhop-dev.appspot.com/o/${topImageUrl}?alt=media`}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        )}
        <p className="absolute inset-x-0 bottom-0 text-white p-2">
          {post.title}
        </p>
      </div>
      <div className="flex justify-between items-end w-full h-1/4">
        <span className="flex gap-2 justify-between items-end p-2 h-full">
          <span className="w-full h-full bg-gray-300 rounded-md">
            {post.user.avatarUrl ? (
              <span className="relative">
                <Image
                  src={post.user.avatarUrl}
                  alt="user-avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </span>
            ) : (
              <UserIcon className="p-2 w-full h-full" />
            )}
          </span>
          <span className="text-sm text-gray-500 font-semibold">
            {post.user.firstName}
          </span>
        </span>
        <span className="p-2">
          <p className="text-gray-500 text-lg font-bold font-mono">
            {post.price}円/{RateMap[post.rate]}
          </p>
        </span>
      </div>
    </div>
  );
};
