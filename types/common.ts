import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ErrorString = string | null;

export enum Rate {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export interface PickupLocation {
  latitude: number;
  longitude: number;
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface PostMedia {
  id: string;
  url: string;
  type: MediaType;
}

export interface Post {
  id: string;
  user: User;
  title: string;
  description: string;
  price: number;
  rate: Rate;
  pickupLocation: PickupLocation;
  medias?: Array<PostMedia>;
  tags?: Array<Tag>;
  createdAt: Date;
}

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Request<T> {
  url: string;
  method: HTTPMethod;
  headers?: Record<string, string>;
  body?: any;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface PaginateParams {
  page: string;
}

export interface PostsParams extends PaginateParams {
  type: string;
  categories?: Set<string>;
  skillLevels?: Set<string>;
  brands?: Set<string>;
}

export interface TagsParams {
  type: string;
}

export interface Category {
  id: string;
  parentId: string;
  value: string;
  label: string;
  path: string;
}

export interface CategoryTree {
  id: string;
  label: string;
  value: string;
  children: Array<CategoryTree> | null;
}

export interface Tag {
  id: string;
  type: string;
  value: string;
  label: string;
}

export type ResponseData = {
  error?: string | null;
  redirectUrl?: string | null;
};

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface PaymentIntentItem {
  id: string;
  price: number;
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
  CANCELED = 'canceled',
}
