import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotographIcon,
  UserIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MediaType, Post, PostMedia, Tag } from '../../types/common';
import { currencyFormat } from '../../utils/common';
import { MAX_QUANTITY, RateMap } from '../../utils/constants';
import mapboxgl, {
  DEFAULT_STYLE,
  DETAILED_ZOOM,
} from '../../utils/frontend/mapbox';
import { getPost } from '../../utils/frontend/posts';
import { DefaultLoading } from '../Common/DefaultLoading';

const PostDetailTags: React.FC<{
  label: string;
  tags: Array<Tag> | undefined;
}> = ({ label, tags }) => (
  <div className="flex flex-col space-y-2">
    <p className="font-sans text-lg text-gray-900">{label}</p>
    <div className="flex flex-col">
      {tags?.map((tag) => (
        <div key={tag.id} className="text-gray-500">
          {tag.label}
        </div>
      ))}
    </div>
  </div>
);

export const PostDetail: React.FC = () => {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const quantRef = useRef<HTMLInputElement>(null);
  const [post, setPost] = useState<Post | null>(null);
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const { post, error } = await getPost(id);
      if (!error && post) {
        setPost(post);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (post && mapRef.current !== null) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        center: [post.pickupLocation.longitude, post.pickupLocation.latitude],
        style: DEFAULT_STYLE,
        zoom: DETAILED_ZOOM,
      });

      new mapboxgl.Marker()
        .setLngLat([
          post.pickupLocation.longitude,
          post.pickupLocation.latitude,
        ])
        .addTo(map);
    }
  }, [post]);

  if (!post) {
    return <DefaultLoading />;
  }

  const images = post.medias
    ? post.medias.filter((media: PostMedia) => media.type === MediaType.IMAGE)
    : [];

  return (
    <div className="flex flex-col items-center bg-gray-100 h-full">
      <div className="relative flex w-full h-64">
        <div className="relative flex flex-no-wrap snap-x snap-mandatory w-full h-full overflow-x-auto transition-all">
          {images.length < 1 && (
            <div className="flex flex-col justify-center items-center w-full text-white bg-black">
              <PhotographIcon className="h-16 w-16" />
              <p>No image found</p>
            </div>
          )}
          {images.map((image: PostMedia) => (
            <div
              className="relative flex snap-center w-full flex-shrink-0 bg-black"
              key={image.id}
            >
              {/* TODO: Either construct the src beforehand or use constants */}
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/boardhop-dev.appspot.com/o/${image.url}?alt=media`}
                alt={image.id}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center h-full p-4 absolute left-0 text-white text-opacity-70">
          <ChevronLeftIcon className="h-10 w-10" />
        </div>
        <div className="flex items-center h-full p-4 absolute right-0 text-white text-opacity-70">
          <ChevronRightIcon className="h-10 w-10" />
        </div>
      </div>
      <div className="w-full h-full px-4 space-y-4 divide-y-2 divide-solid divide-gray-300">
        <div className="py-4 space-y-4">
          <div className="font-sans text-xl text-gray-900">{post.title}</div>
          <div className="font-sans text-base text-gray-700 font-thin opacity-70">
            <p>{post.description}</p>
          </div>
          <div className="font-sans text-xl text-gray-900">
            <span>
              {currencyFormat(post.price)}円/{RateMap[post.rate]}
            </span>
            <input
              type="number"
              className="ml-2 py-1 px-2 w-14 rounded-md border border-gray-300 text-base text-gray-700 text-center appearance-none"
              ref={quantRef}
              max={MAX_QUANTITY}
              defaultValue={1}
            />
          </div>
          <div className="w-full">
            <button
              className="w-full p-2 rounded-md shadow-sm text-white bg-primary-500"
              onClick={() => {
                router.push(
                  `/posts/${post.id}/payment?quantity=${quantRef.current?.value}`
                );
              }}
            >
              レンタルする
            </button>
          </div>
        </div>
        <div className="py-4 space-y-4">
          <PostDetailTags
            label="ブランド"
            tags={post.tags?.filter((tag) => tag.type === 'Surfboard Brand')}
          />
          <PostDetailTags
            label="スキルレベル"
            tags={post.tags?.filter((tag) => tag.type === 'Skill Level')}
          />
        </div>
        <div className="flex pt-4 space-x-4 items-end">
          <span className="w-14 h-14 bg-gray-300 rounded-md">
            {post.user.avatarUrl ? (
              <span className="relative h-full w-full">
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
          <span className="font-sans text-md text-gray-500 font-semibold">
            Test Test
          </span>
        </div>
        <div ref={mapRef} className="py-4 w-full h-64"></div>
      </div>
    </div>
  );
};
