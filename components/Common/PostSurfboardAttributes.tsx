import React, { useEffect, useState } from 'react';
import { Tag } from '../../types/common';
import { getTags } from '../../utils/frontend/tags';
import { DropdownMenu } from '../Common/DropdownMenu';

interface PostSurfboardAttributesProps {
  skillValue: Tag;
  brandValue: Tag;
  setSkillValue: (value: Tag) => void;
  setBrandValue: (value: Tag) => void;
}

export const PostSurfboardAttributes: React.FC<PostSurfboardAttributesProps> = ({
  skillValue,
  brandValue,
  setSkillValue,
  setBrandValue,
}) => {
  const [tags, setTags] = useState<Array<Tag>>([]);

  useEffect(() => {
    (async () => {
      const { tags, error } = await getTags({ type: 'surfboard' });
      if (!error && tags) {
        setTags(tags);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col my-4 w-full">
        <p className="font-sans mb-2 text-sm text-gray-700">スキルレベル</p>
        <DropdownMenu
          label={skillValue.label ?? '選択する'}
          items={tags
            .filter((tag) => tag.type === 'Skill Level')
            .map((tag) => ({
              label: tag.label,
              action: () => setSkillValue(tag),
            }))}
        />
      </div>
      <div className="flex flex-col my-4 w-full">
        <p className="font-sans mb-2 text-sm text-gray-700">ブランド</p>
        <DropdownMenu
          label={brandValue.label ?? '選択する'}
          items={tags
            .filter((tag) => tag.type === 'Surfboard Brand')
            .map((tag) => ({
              label: tag.label,
              action: () => setBrandValue(tag),
            }))}
        />
      </div>
    </>
  );
};
