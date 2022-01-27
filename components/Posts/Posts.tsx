import UserIcon from '@heroicons/react/outline/UserIcon';
import Image from 'next/image';
import React, { BaseSyntheticEvent, useState } from 'react';
import { usePostsContext } from '../../contexts/PostsContext';
import { Category, MediaType, Post, PostsParams } from '../../types/common';
import { DEFAULT_POST_IMAGE_LINK, RateMap } from '../../utils/constants';

interface Tag {
  id: string;
  label: string;
  value: string;
}

interface SkillLevel extends Tag { }

interface Brand extends Tag { }

// TODO: Replace with actual data
const MockSkillLevels: Array<SkillLevel> = [
  { id: '1', label: '初心者', value: 'Beginner' },
  { id: '2', label: '中級者', value: 'Intermediate' },
  { id: '3', label: '上級者', value: 'Advanced' },
]

// TODO: Replace with actual data
const MockBrands: Array<Brand> = [
  { id: '1', label: 'JS', value: 'JS' },
  { id: '2', label: 'Mayhem', value: 'Mayhem' },
  { id: '3', label: 'Burton', value: 'Burton' },
]

interface TagsProps {
  label: string;
  name: string;
  tags: Array<Tag>;
  params?: Set<string>;
  handler: (event: BaseSyntheticEvent) => void;
}

const Tags: React.FC<TagsProps> = ({ label, name, tags, params, handler }) => {
  return (
    <div className="divide-y-2 divide-gray-300 w-full">
      <p>{label}</p>
      <div>
        {tags.map((tag: Tag) => (
          <div key={tag.id}>
            <input
              type="checkbox"
              name={name}
              value={tag.value}
              onChange={handler}
              checked={params?.has(tag.value)}
            />
            {' ' + tag.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// TODO: Replace with actual data
const MockRootCategory: Category = {
  id: '1',
  label: '全てのカテゴリー',
  value: 'root',
  children: [
    {
      id: '2', label: 'サーフボード', value: 'surfboard', children: [
        {
          id: '4', label: 'ショートボード', value: 'shortboard', children: [
            { id: '6', label: 'EPS', value: 'eps', children: null },
            { id: '7', label: 'PU', value: 'pu', children: null },
          ]
        },
        { id: '5', label: 'ロングボード', value: 'longboard', children: null },
      ]
    },
    { id: '3', label: 'スノーボード', value: 'snowboard', children: null },
  ]
}

interface CategoryTreeProps {
  category: Category;
  depth: number;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ category, depth }) => {
  const { postsParams, updatePostsParams } = usePostsContext();

  const handleClick = () => {
    updatePostsParams({ ...postsParams, categories: new Set([category.value]) });
  }

  return (
    <div>
      {Array(depth).fill('　').map((d, index) => <span key={index}>{d}</span>)}
      <span className="border-b-2" onClick={handleClick}>{category.label}</span>
      {category.children && category.children.map((child: Category) => (<CategoryTree key={child.id} category={child} depth={depth + 1} />))}
    </div>
  )
}

interface CategoriesProps { }

const Categories: React.FC<CategoriesProps> = () => {
  return (
    <div className="divide-y-2 divide-gray-300 w-full">
      <p>カテゴリー</p>
      <div>
        <CategoryTree category={MockRootCategory} depth={0} />
      </div>
    </div>
  )
}

const initialPostsParams: PostsParams = {
  type: '',
  categories: new Set(),
  skillLevels: new Set(),
  brands: new Set(),
  page: '0',
}

interface PostComponentProps {
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  const [topImage, ...images] = post.medias.filter((media) => media.type === MediaType.IMAGE)
  const topImageUrl = topImage && topImage.url ? topImage.url : DEFAULT_POST_IMAGE_LINK;

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
          <p className="text-gray-500 text-lg font-bold font-mono">{post.price}円/{RateMap[post.rate]}</p>
        </span>
      </div>
    </div>
  )
}

interface PostsProps { }

export const Posts: React.FC<PostsProps> = () => {
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [localPostsParams, setLocalPostsParams] = useState<PostsParams>(initialPostsParams);
  const { posts, isLoading, isError, updatePostsParams } = usePostsContext();

  const toggleFilterMenu = () => setFilterMenu((prev) => !prev);

  const handleFilter = () => updatePostsParams(localPostsParams);

  const handleSkillLevelChange = (event: BaseSyntheticEvent) => {
    handleTagChange(event, localPostsParams.skillLevels);
    setLocalPostsParams({ ...localPostsParams });
  }

  const handleBrandChange = (event: BaseSyntheticEvent) => {
    handleTagChange(event, localPostsParams.brands);
    setLocalPostsParams({ ...localPostsParams });
  }

  const handleTagChange = (event: BaseSyntheticEvent, tags: Set<string> | undefined) => {
    if (event.currentTarget.checked) {
      tags?.add(event.currentTarget.value);
    } else {
      tags?.delete(event.currentTarget.value);
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div className="flex flex-col items-center bg-gray-100 h-full px-2">
      <div className="flex w-full justify-evenly my-3">
        <span><button className="py-2 px-3 bg-green-600 text-white rounded-md" onClick={toggleFilterMenu}>Filter</button></span>
        <span><button className="py-2 px-3 bg-green-600 text-white rounded-md" onClick={() => { }}>View</button></span>
        <span><button className="py-2 px-3 bg-green-600 text-white rounded-md" onClick={() => { }}>Map</button></span>
      </div>
      {filterMenu && (
        <div className="flex flex-col items-center w-full">
          <Categories />
          <Tags label="スキルレベル" name="skill_level" tags={MockSkillLevels} params={localPostsParams.skillLevels} handler={handleSkillLevelChange} />
          <Tags label="ブランド" name="brand" tags={MockBrands} params={localPostsParams.brands} handler={handleBrandChange} />
          <div className="w-full my-2"><button className="py-2 px-3 bg-gray-900 text-white rounded-md w-full" onClick={handleFilter}>更新する</button></div>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full">
        {posts.length > 0
          ? posts.map((post: Post, index: number) => (
            <PostComponent key={index} post={post} />
          ))
          : <div className="w-full text-center text-gray-500">
            <p>検索結果が見つかりませんでした</p>
          </div>
        }
      </div>
    </div>
  );
}