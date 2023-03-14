import { Category } from '../../types/common';

export const getCategories = async (): Promise<{
  categories: Array<Category> | null;
  error: any;
}> => {
  try {
    const options = { method: 'GET' };
    const response = await fetch('/api/categories', options);

    if (response.status >= 300) {
      return {
        categories: null,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      categories: data.categories,
      error: data.categories ? null : 'Failed to get categories',
    };
  } catch (error) {
    return {
      categories: null,
      error: 'Failed to get categories',
    };
  }
};
