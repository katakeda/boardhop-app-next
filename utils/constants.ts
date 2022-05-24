import { Rate } from "../types/common";

export const APP_URL_SCHEME = process.env.NEXT_PUBLIC_APP_URL_SCHEME;
export const APP_URL_HOST = process.env.NEXT_PUBLIC_APP_URL_HOST;
export const APP_URL_PORT = process.env.NEXT_PUBLIC_APP_URL_PORT;
export const APP_URL = APP_URL_SCHEME + '://' + APP_URL_HOST + ':' + APP_URL_PORT;
export const API_ENDPOINT_SCHEME = process.env.NEXT_PUBLIC_API_ENDPOINT_SCHEME;
export const API_ENDPOINT_HOST = process.env.NEXT_PUBLIC_API_ENDPOINT_HOST;
export const API_ENDPOINT_PORT = process.env.NEXT_PUBLIC_API_ENDPOINT_PORT;
export const API_ENDPOINT = API_ENDPOINT_SCHEME + '://' + API_ENDPOINT_HOST + ':' + API_ENDPOINT_PORT + '/api';
export const POSTS_API_ENDPOINT = API_ENDPOINT + '/posts';
export const USER_API_ENDPOINT = API_ENDPOINT + '/user';
export const TAGS_API_ENDPOINT = API_ENDPOINT + '/tags';
export const CATEGORIES_API_ENDPOINT = API_ENDPOINT + '/categories';
export const USER_SIGNUP_API_ENDPOINT = API_ENDPOINT + '/user/signup';
export const USER_LOGIN_API_ENDPOINT = API_ENDPOINT + '/user/login';
export const USER_LOGOUT_API_ENDPOINT = API_ENDPOINT + '/user/logout';
export const PAYMENT_INTENT_API_ENDPOINT = API_ENDPOINT + '/payment/intent';
export const PAYMENT_COMPLETE_API_ENDPOINT = API_ENDPOINT + '/payment/complete';
export const CDN_URL = 'http://localhost:3000';
export const DEFAULT_POST_IMAGE_LINK = CDN_URL + '/img/sample-surfboard.jpg';

export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const RateMap: Record<Rate, string> = {} as Record<Rate, string>;
RateMap[Rate.HOUR] = '時';
RateMap[Rate.DAY] = '日';

export const MAX_QUANTITY = 30;