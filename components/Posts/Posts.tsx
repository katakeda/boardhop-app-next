import React from 'react';
import Image from 'next/image';
import UserIcon from '@heroicons/react/outline/UserIcon';
import { usePostsContext } from '../../contexts/PostsContext';
import { MediaType, Post, PostsParams } from '../../types/common';
import { DEFAULT_POST_IMAGE_LINK } from '../../utils/constants';
import { useGetPosts } from '../../utils/posts';

interface PostsProps {}

export const Posts: React.FC<PostsProps> = () => {
  const { postsParams, updatePostsParams } = usePostsContext();
  const { posts, isLoading, isError } = useGetPosts(postsParams);

  const filter = () => {
    const mockPostsParams: PostsParams = {
      type: 'surfboards',
      category: 'shortboards',
      brand: 'js',
      page: '2',
    }
    updatePostsParams(mockPostsParams);
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div className="flex flex-col items-center bg-gray-100 h-full px-2">
      <div className="flex w-full justify-evenly border-b-2 border-gray-300 my-3">
        <span><button onClick={filter}>Filter</button></span>
        <span>View</span>
        <span>Map</span>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {posts.map((post: Post) => {
          const [topImage, ...images] = post.medias.filter((media) => media.type === MediaType.IMAGE);
          const topImageUrl = topImage ? topImage.url : DEFAULT_POST_IMAGE_LINK;

          return (
            <div key={post.id} className="flex flex-col bg-white shadow-lg rounded-lg divide-y-2 w-full h-64">
              <div className="relative w-full h-3/4">
                <Image className="rounded-t-lg" src={topImageUrl} alt={post.title} layout="fill" objectFit="cover" />
                <p className="absolute inset-x-0 bottom-0 text-white p-2">{post.title}</p>
              </div>
              <div className="flex justify-between items-end w-full h-1/4">
                <span className="flex gap-2 justify-between items-end p-2 h-full">
                  <span className="w-full h-full bg-gray-300 rounded-md">
                    {post.user.avatarUrl
                      ? <span className="relative">
                          <Image src={post.user.avatarUrl} alt="user-avatar" layout="fill" objectFit="cover" />
                        </span>
                      : <UserIcon className="p-2 w-full h-full" />
                    }
                  </span>
                  <span className="text-sm text-gray-500 font-semibold">{post.user.username}</span>
                </span>
                <span className="p-2">
                  <p className="text-gray-500 text-lg font-bold font-mono">{post.price}円/{post.rate}</p>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}