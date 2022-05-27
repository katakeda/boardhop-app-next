import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '../../contexts/AuthContext';
import { Post, PostsParams } from '../../types/common';
import { getPosts } from '../../utils/frontend/posts';
import { DefaultLoading } from '../Common/DefaultLoading';

export const DashboardPosts: React.FC = () => {
  const user = useAuthContext((value) => value.state.user);
  const [posts, setPosts] = useState<Array<Post> | null>(null);

  useEffect(() => {
    if (user) {
      (async () => {
        const { posts } = await getPosts({ userId: user.id } as PostsParams);
        setPosts(posts);
      })();
    }
  }, [user]);

  if (!posts) {
    return <DefaultLoading />;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="py-6 px-8">
        {posts.length < 1 && (
          <div className="flex flex-col items-center space-y-3 mt-8">
            <p className="font-sans text-gray-400">
              現在、表示する投稿がありません
            </p>
            <Link href={'/posts/new'} passHref>
              <a className="text-sm text-blue-500 underline">投稿を作成</a>
            </Link>
          </div>
        )}
        {posts.length > 0 && (
          <>
            <div className="flex justify-between pt-2 border-b-4 border-gray-300 bg-gray-300 rounded-t-md">
              <span className="ml-10 text-sm text-gray-700 font-sans">題名</span>
              <span className="mr-10 text-sm text-gray-700 font-sans">投稿日</span>
            </div>
            {posts.map((post, index) => {
              const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-300';
              return (
                <div
                  key={post.id}
                  className={`flex justify-between py-2 ${bgColor}`}
                >
                  <span className="ml-10">
                    <Link href={`/posts/${post.id}`} passHref>
                      <a className="text-sm text-blue-500 underline">
                        {post.title}
                      </a>
                    </Link>
                  </span>
                  <span className="mr-10 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
