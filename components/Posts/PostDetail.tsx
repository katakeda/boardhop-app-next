import { UserIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { MediaType, PostMedia } from '../../types/common';
import { DEFAULT_POST_IMAGE_LINK, RateMap } from '../../utils/constants';
import mapboxgl from '../../utils/mapbox';
import { useGetPost } from '../../utils/posts';

interface PostDetailProps { }

export const PostDetail: React.FC<PostDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { post, isLoading, isError } = useGetPost(id);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post && mapRef.current !== null) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [post.pickupLocation.longitude, post.pickupLocation.latitude],
        zoom: 10,
      });

      new mapboxgl.Marker()
        .setLngLat([post.pickupLocation.longitude, post.pickupLocation.latitude])
        .addTo(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const [topImage, ...images] = post.medias.filter((media: PostMedia) => media.type === MediaType.IMAGE);
  const topImageUrl = topImage && topImage.url ? topImage.url : DEFAULT_POST_IMAGE_LINK;

  return (
    <div className="flex flex-col items-center space-y-2 bg-gray-100 h-full px-2">
      <div className="relative w-full h-64">
        <Image src={topImageUrl} alt={post.title} layout="fill" objectFit="cover" />
      </div>
      {images.length > 0 && (
        <div className="flex w-full h-20">
          {images.map((image: PostMedia) => (
            <div className="relative h-full w-20" key={image.id}>
              <Image src={image.url} alt={image.id} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      )}
      <div className="text-xl text-gray-900">{post.title}</div>
      <div className="text-base text-gray-900 font-thin"><p>{post.description}</p></div>
      <div className="text-2xl text-gray-900"><p>{post.price}円/{RateMap[post.rate]}</p></div>
      <div className="flex gap-2 justify-between items-end p-2">
        <span className="w-14 h-14 bg-gray-300 rounded-md">
          {post.user.avatarUrl
            ? <span className="relative h-full w-full">
              <Image src={post.user.avatarUrl} alt="user-avatar" layout="fill" objectFit="cover" />
            </span>
            : <UserIcon className="p-2 w-full h-full" />
          }
        </span>
        <span className="text-sm text-gray-500 font-semibold">{post.user.firstName}</span>
      </div>
      <div className="w-full"><button className="w-full px-3 py-2 rounded-md border-2 border-green-600" onClick={() => {}}>レンタルする</button></div>
      <div ref={mapRef} className="w-full h-64"></div>
    </div>
  );
}