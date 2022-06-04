import React, { BaseSyntheticEvent } from 'react';

interface Tag {
  id: string;
  label: string;
  value: string;
}

interface FilterMenuTagsProps {
  label: string;
  name: string;
  tags: Array<Tag>;
  params?: Set<string>;
  handler: (event: BaseSyntheticEvent) => void;
}

export const FilterMenuTags: React.FC<FilterMenuTagsProps> = ({ label, name, tags, params, handler }) => {
  return (
    <div className="divide-y divide-gray-300 w-full">
      <p className='font-sans text-gray-500'>{label}</p>
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
  );
}