import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Action, usePostsContext } from '../../contexts/PostsContext';
import { Tag } from '../../types/common';
import { getTags } from '../../utils/frontend/tags';
import { FilterMenuCategories } from './FilterMenuCategories';
import { FilterMenuTags } from './FilterMenuTags';

export const FilterMenu: React.FC = () => {
  const postsParams = usePostsContext((value) => value.state.postsParams);
  const dispatch = usePostsContext((value) => value.dispatch);
  const [tags, setTags] = useState<Array<Tag>>([]);

  useEffect(() => {
    (async () => {
      const { tags, error } = await getTags({
        type: ['surfboard', 'snowboard'].join(','),
      });
      if (!error && tags) {
        setTags(tags);
      }
    })();
  }, []);

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
        tags={tags.filter((tag) => tag.type == 'Skill Level')}
        params={postsParams.skillLevels}
        handler={handleSkillLevelChange}
      />
      <FilterMenuTags
        label="ブランド"
        name="brand"
        tags={tags.filter((tag) => ['Surfboard Brand', 'Snowboard Brand'].includes(tag.type))}
        params={postsParams.brands}
        handler={handleBrandChange}
      />
    </div>
  );
};
