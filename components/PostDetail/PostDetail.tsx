import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MediaType, Post, PostMedia } from '../../types/common';
import { RateMap } from '../../utils/constants';
import mapboxgl, { DEFAULT_STYLE, DEFAULT_ZOOM } from '../../utils/mapbox';
import { getPost } from '../../utils/posts';
import { DefaultLoading } from '../Common/DefaultLoading';

interface PostDetailProps {}

export const PostDetail: React.FC<PostDetailProps> = () => {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
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
        zoom: DEFAULT_ZOOM,
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

  const images = post.medias.filter(
    (media: PostMedia) => media.type === MediaType.IMAGE
  );

  return (
    <div className="flex flex-col items-center bg-gray-100 h-full">
      <div className="relative flex w-full h-64">
        <div className="relative flex flex-no-wrap snap-x snap-mandatory w-full h-full overflow-x-auto transition-all">
          {images.map((image: PostMedia) => (
            <div
              className="relative flex snap-center w-full flex-shrink-0 bg-black"
              key={image.id}
            >
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
          <div className="font-sans text-xl text-gray-700">{post.title}</div>
          <div className="font-sans text-base text-gray-700 font-thin opacity-70">
            <p>{post.description}</p>
          </div>
          <div className="font-sans text-xl text-gray-900">
            <p>
              {post.price}円/{RateMap[post.rate]}
            </p>
          </div>
          <div className="w-full">
            <button
              className="w-full p-2 rounded-md shadow-sm text-white bg-primary-500"
              onClick={() => {}}
            >
              レンタルする
            </button>
          </div>
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
