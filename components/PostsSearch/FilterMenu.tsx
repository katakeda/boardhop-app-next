import React, { BaseSyntheticEvent } from 'react';
import { Action, usePostsContext } from '../../contexts/PostsContext';
import { FilterMenuCategories } from './FilterMenuCategories';
import { FilterMenuTags } from './FilterMenuTags';

interface Tag {
  id: string;
  label: string;
  value: string;
}

interface SkillLevel extends Tag {}

interface Brand extends Tag {}

// TODO: Replace with actual data
const MockSkillLevels: Array<SkillLevel> = [
  { id: '1', label: '初心者', value: 'beginner' },
  { id: '2', label: '中級者', value: 'intermediate' },
  { id: '3', label: '上級者', value: 'advanced' },
];

// TODO: Replace with actual data
const MockBrands: Array<Brand> = [
  { id: '1', label: 'JS', value: 'js' },
  { id: '2', label: 'Mayhem', value: 'mayhem' },
  { id: '3', label: 'Burton', value: 'burton' },
];

export const FilterMenu: React.FC = () => {
  const postsParams = usePostsContext((value) => value.state.postsParams);
  const dispatch = usePostsContext((value) => value.dispatch);

  const handleSkillLevelChange = (event: BaseSyntheticEvent) => {
    handleTagChange(event, postsParams.skillLevels);
    dispatch({ type: Action.SET_POSTS_PARAMS, payload: { ...postsParams } });
  };

  const handleBrandChange = (event: BaseSyntheticEvent) => {
    handleTagChange(event, postsParams.brands);
    dispatch({ type: Action.SET_POSTS_PARAMS, payload: { ...postsParams } });
  };

  const handleTagChange = (
    event: BaseSyntheticEvent,
    tags: Set<string> | undefined
  ) => {
    if (event.currentTarget.checked) {
      tags?.add(event.currentTarget.value);
    } else {
      tags?.delete(event.currentTarget.value);
    }
  };

  return (
    <div className="flex flex-col space-y-3 items-center w-full mb-4">
      <FilterMenuCategories />
      <FilterMenuTags
        label="スキルレベル"
        name="skill_level"
        tags={MockSkillLevels}
        params={postsParams.skillLevels}
        handler={handleSkillLevelChange}
      />
      <FilterMenuTags
        label="ブランド"
        name="brand"
        tags={MockBrands}
        params={postsParams.brands}
        handler={handleBrandChange}
      />
    </div>
  );
};
