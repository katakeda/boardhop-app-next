import React from 'react';
import { Action, usePostsContext } from '../../contexts/PostsContext';
import { CategoryTree } from '../../types/common';

// TODO: Replace with actual data
const MockRootCategory: CategoryTree = {
  id: '1',
  label: '全てのカテゴリー',
  value: 'all',
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

interface FilterMenuCategoryTreeProps {
  category: CategoryTree;
  depth: number;
}

const FilterMenuCategoryTree: React.FC<FilterMenuCategoryTreeProps> = ({ category, depth }) => {
  const postsParams = usePostsContext((value) => value.state.postsParams);
  const dispatch = usePostsContext((value) => value.dispatch);

  const handleClick = () => {
    dispatch({
      type: Action.SET_POSTS_PARAMS,
      payload: { ...postsParams, categories: new Set([category.value]) },
    });
  }

  return (
    <div>
      {Array(depth).fill('　').map((d, index) => <span key={index}>{d}</span>)}
      <span className="border-b-2" onClick={handleClick}>{category.label}</span>
      {category.children && category.children.map((child: CategoryTree) => (<FilterMenuCategoryTree key={child.id} category={child} depth={depth + 1} />))}
    </div>
  )
}

interface FilterMenuCategoriesProps { }

export const FilterMenuCategories: React.FC<FilterMenuCategoriesProps> = () => {
  return (
    <div className="divide-y divide-gray-300 w-full">
      <p className='font-sans text-gray-500'>カテゴリー</p>
      <div>
        <FilterMenuCategoryTree category={MockRootCategory} depth={0} />
      </div>
    </div>
  );
}