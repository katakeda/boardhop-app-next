import useSWR from "swr";
import { MediaType, PickupLocation, Post, PostMedia, PostsParams, Rate } from "../types/common";
import { DEFAULT_POST_IMAGE_LINK, POSTS_API_ENDPOINT } from "./constants";

interface NewPostPayload {
  userId: string;
  title: string;
  description: string;
  price: number;
  rate: Rate;
  pickupLocation?: PickupLocation;
  imageData?: FormData;
}

export const getPosts = async (postsParams: PostsParams) => {
  let queryArr: Array<string> = [];
  if (Number(postsParams.page) > 0) {
    queryArr.push(`p=${postsParams.page}`);
  }
  if (postsParams.type !== '') {
    queryArr.push(`type=${postsParams.type}`);
  }
  if (postsParams.categories && postsParams.categories.size > 0) {
    queryArr.push(`cats=${Array.from(postsParams.categories).join(',')}`)
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
    const response = await fetch(`${POSTS_API_ENDPOINT}?${queryArr.join('&')}`, { method: 'GET' });

    if (response.status >= 300) {
      return {
        posts: [],
        error: response.statusText,
      }
    }

    const data = await response.json();

    return {
      posts: data?.posts ?? [],
      error: null,
    }
  } catch (error) {
    return {
      posts: [],
      error: 'Failed to get posts',
    }
  }
}

export const useGetPost = (id: string | Array<string> | undefined) => {
  if (typeof id !== 'string') {
    id = '';
  }

  const options = { method: 'GET' };
  const url = `${POSTS_API_ENDPOINT}/${id}`;
  const fetcher = () => fetch(url, options).then(res => res.json());
  const { data, error } = useSWR(url, fetcher);

  return {
    post: data?.post ?? {},
    isLoading: !data && !error,
    isError: !!error,
  }
}

export const submitPost = async (payload: NewPostPayload) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(POSTS_API_ENDPOINT, options);

    if (response.status >= 300) {
      return {
        post: null,
        error: response.statusText,
      }
    }

    const data = await response.json();

    return {
      post: data?.post ?? {},
      error: null,
    }
  } catch (error) {
    return {
      post: null,
      error,
    }
  }
}

export const generateMockPost = (): Post => {
  const id = Math.round(Math.random() * 100).toString();
  const user = { id: '1', email: 'test@example.com', firstName: 'First', lastName: 'Last', avatarUrl: '' };
  const pickupLocation: PickupLocation = { latitude: 33, longitude: -118 };
  const medias: Array<PostMedia> = [{ id: '1', url: DEFAULT_POST_IMAGE_LINK, type: MediaType.IMAGE }];

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
  }
}