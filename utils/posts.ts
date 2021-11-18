import useSWR from "swr";
import { MediaType, PickupLocation, Post, PostMedia, PostsParams, Rate } from "../types/common";
import { DEFAULT_POST_IMAGE_LINK, GET_POSTS_API_ENDPOINT } from "./constants";

export const useGetPosts = (postsParams: PostsParams) => {
  const options = { method: 'GET' };
  const fetcher = () => fetch(GET_POSTS_API_ENDPOINT, options).then(res => res.json());
  const { data, error } = useSWR(GET_POSTS_API_ENDPOINT, fetcher);

  return {
    posts: data?.posts ?? [],
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