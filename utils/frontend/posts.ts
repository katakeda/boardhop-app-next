import {
  MediaType,
  PickupLocation,
  Post,
  PostMedia,
  PostsParams,
  Rate,
  User,
} from '../../types/common';

export const getPosts = async (
  postsParams: PostsParams
): Promise<{ posts: Array<Post>; error: any }> => {
  let queryArr: Array<string> = [];
  if (Number(postsParams.page) > 0) {
    queryArr.push(`p=${postsParams.page}`);
  }
  if (postsParams.categories && postsParams.categories.size > 0) {
    queryArr.push(`cats=${Array.from(postsParams.categories).join(',')}`);
  }
  if (postsParams.userId) {
    queryArr.push(`uid=${postsParams.userId}`);
  }

  let tags: Array<string> = [];
  if (postsParams.skillLevels && postsParams.skillLevels.size > 0) {
    tags.push(...Array.from(postsParams.skillLevels));
  }
  if (postsParams.brands && postsParams.brands.size > 0) {
    tags.push(...Array.from(postsParams.brands));
  }

  if (tags.length > 0) {
    queryArr.push(`tags=${tags.join(',')}`);
  }

  try {
    const options = { method: 'GET' };
    const response = await fetch(`/api/posts?${queryArr.join('&')}`, options);

    if (response.status >= 300) {
      return {
        posts: [],
        error: response.statusText,
      };
    }

    const data = await response.json();
    const posts = data.posts.map(convertResponseDataToPost);

    return {
      posts: posts,
      error: null,
    };
  } catch (error) {
    return {
      posts: [],
      error: 'Failed to get posts',
    };
  }
};

export const getPost = async (
  id: string | Array<string> | undefined
): Promise<{
  post: Post | null;
  error: any;
}> => {
  if (typeof id !== 'string') {
    id = '';
  }

  try {
    const options = { method: 'GET' };
    const response = await fetch(`/api/posts/${id}`, options);

    if (response.status >= 300) {
      return {
        post: null,
        error: response.statusText,
      };
    }

    const data = await response.json();
    const post = convertResponseDataToPost(data.post);

    return {
      post: post,
      error: null,
    };
  } catch (error) {
    return {
      post: null,
      error: 'Failed to get post',
    };
  }
};

export const createPost = async (
  payload: any
): Promise<{ post: Post | null; error: any }> => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch('/api/posts', options);

    if (response.status >= 300) {
      return {
        post: null,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      post: data.post,
      error: data.post ? null : 'Failed to submit post',
    };
  } catch (error) {
    return {
      post: null,
      error,
    };
  }
};

export const updatePost = async (
  id: string | Array<string> | undefined,
  payload: any
): Promise<{ post: Post | null; error: any }> => {
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(`/api/posts/${id}`, options);

    if (response.status >= 300) {
      return {
        post: null,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      post: data.post,
      error: data.post ? null : 'Failed to update post',
    };
  } catch (error) {
    return {
      post: null,
      error,
    };
  }
};

export const generateMockPost = (): Post => {
  const id = Math.round(Math.random() * 100).toString();
  const user = {
    id: '1',
    email: 'test@example.com',
    firstName: 'First',
    lastName: 'Last',
    avatarUrl: '',
  };
  const pickupLocation: PickupLocation = { latitude: 33, longitude: -118 };
  const medias: Array<PostMedia> = [
    { id: '1', url: '/img/sample-surfboard.jpg', type: MediaType.IMAGE },
  ];

  return {
    id,
    user,
    title: `MockPost #${id}`,
    description: `This is mock post for id #${id}`,
    price: Math.round(Math.random() * 100),
    rate: Rate.DAY,
    pickupLocation,
    medias,
    createdAt: new Date(),
  };
};

export const convertResponseDataToPost = (data: any): Post => {
  const user: User = {
    id: data.userId,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarUrl: data.avatarUrl,
  };

  const medias: Array<PostMedia> = !data.medias
    ? []
    : data.medias.map((media: any) => ({
        id: media.id,
        url: media.mediaUrl,
        type: media.type,
      }));
  const categories: Array<string> = !data.categories
    ? []
    : data.categories.split(',');

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    rate: data.rate,
    pickupLocation: {
      latitude: data.pickupLatitude,
      longitude: data.pickupLongitude,
    },
    medias: medias,
    tags: data.tags,
    categories: categories,
    createdAt: data.createdAt,
    user,
  };
};
