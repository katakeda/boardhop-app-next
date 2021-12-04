import useSWR from "swr";
import { MediaType, PickupLocation, Post, PostMedia, PostsParams, Rate } from "../types/common";
import { DEFAULT_POST_IMAGE_LINK, GET_POSTS_API_ENDPOINT } from "./constants";

export const useGetPosts = (postsParams: PostsParams) => {
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

  const options = { method: 'GET' };
  const url = `${GET_POSTS_API_ENDPOINT}?${queryArr.join('&')}`;
  const fetcher = () => fetch(url, options).then(res => res.json());
  const { data, error } = useSWR(url, fetcher);

  return {
    posts: data?.posts ?? [],
    isLoading: !data && !error,
    isError: !!error,
  }
}

export const useGetPost = (id: string | Array<string> | undefined): { post: Post, isLoading: boolean, isError: boolean } => {
  if (typeof id !== 'string') {
    id = '';
  }

  const options = { method: 'GET' };
  const url = `${GET_POSTS_API_ENDPOINT}/${id}`;
  const fetcher = () => fetch(url, options).then(res => res.json());
  const { data, error } = useSWR(url, fetcher);

  return {
    post: data?.post ?? {},
    isLoading: !data && !error,
    isError: !!error,
  }
}

export const generateMockPost = (): Post => {
  const id = Math.round(Math.random()*100).toString();
  const user = { id: '1', username: 'test', email: 'test@example.com', avatarUrl: '' };
  const pickupLocation: PickupLocation = { latitude: 33, longitude: -118 };
  const medias: Array<PostMedia> = [{ id: '1', url: DEFAULT_POST_IMAGE_LINK, type: MediaType.IMAGE }];

  return {
    id,
    user,
    title: `MockPost #${id}`,
    description: `This is mock post for id #${id}`,
    price: Math.round(Math.random()*100),
    rate: Rate.DAY,
    pickupLocation,
    medias,
    createdAt: new Date(),
  }
}