import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import useSWR from "swr";
import { User } from "../types/common";
import { USER_API_ENDPOINT, USER_LOGIN_API_ENDPOINT, USER_SIGNUP_API_ENDPOINT } from "./constants";

// TODO: This may be shared type
type UserResponse = {
  isLoading: boolean;
  isError: boolean;
}

type GetUserResponse = {
  user: User;
} & UserResponse;

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const getUserResponse = async (req: NextRequest | NextApiRequest) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.cookies.boardhopauth}`
    },
  }

  return await fetch(`${process.env.BACKEND_API_ENDPOINT}/user`, options);
}

export const signup = async (payload: SignupPayload) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(USER_SIGNUP_API_ENDPOINT, options);

    if (response.status >= 300) {
      return {
        user: null,
        error: response.statusText,
      }
    }

    const data = await response.json();

    return {
      user: data?.user ?? {},
      error: null,
    }
  } catch (error) {
    return {
      user: null,
      error,
    }
  }
}

export const login = async (payload: LoginPayload) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(USER_LOGIN_API_ENDPOINT, options);

    if (response.status >= 300) {
      return {
        user: null,
        error: response.statusText,
      }
    }

    const data = await response.json();

    return {
      user: data?.user ?? {},
      error: null,
    }
  } catch (error) {
    return {
      user: null,
      error,
    }
  }
}

export const useGetUser = (): GetUserResponse => {
  const options = {
    method: 'GET',
    headers: { credentials: 'include' },
  };

  const fetcher = async (url: string) => {
    const response = await fetch(url, options);

    if (response.status >= 300) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to get user');
    }

    return await response.json();
  };

  const { data, error } = useSWR(USER_API_ENDPOINT, fetcher);

  return {
    user: data?.user ?? {},
    isLoading: !data && !error,
    isError: !!error,
  }
}