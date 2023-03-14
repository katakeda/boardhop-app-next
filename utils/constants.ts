import { Rate } from '../types/common';

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const RateMap: Record<Rate, string> = {} as Record<Rate, string>;
RateMap[Rate.HOUR] = '時';
RateMap[Rate.DAY] = '日';

export const MAX_QUANTITY = 30;
