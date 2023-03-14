import { TagsParams } from '../../types/common';

export const getTags = async (params: TagsParams) => {
  try {
    const options = { method: 'GET' };
    const response = await fetch(`/api/tags?type=${params.type}`, options);

    if (response.status >= 300) {
      return {
        tags: null,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      tags: data.tags,
      error: data.tags ? null : 'Failed to get tags',
    };
  } catch (error) {
    return {
      tags: null,
      error: 'Failed to get tags',
    };
  }
};
