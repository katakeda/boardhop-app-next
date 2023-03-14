import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import { User } from '../types/common';

type UserResponse = {
  isLoading: boolean;
  isError: boolean;
};

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

export const getUserResponse = async (req: NextRequest) => {
  return _getUserResponse(req.cookies.get('boardhop_auth') ?? '');
};

export const getUserResponseApi = async (req: NextApiRequest) => {
  return _getUserResponse(req.cookies.boardhop_auth ?? '');
};

export const signup = async (payload: SignupPayload) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch('/api/user/signup', options);

    if (response.status >= 300) {
      return {
        user: null,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      user: data?.user ?? {},
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error,
    };
  }
};

export const login = async (payload: LoginPayload) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch('/api/user/login', options);

    if (response.status >= 300) {
      return {
        user: null,
        error: response.statusText,
      };
    }

    const data = await response.json();

    return {
      user: data?.user ?? {},
      error: null,
      redirectUrl: data?.redirectUrl,
    };
  } catch (error) {
    return {
      user: null,
      error,
    };
  }
};

export const logout = async (): Promise<boolean> => {
  const options = {
    method: 'POST',
    headers: { credentials: 'include' },
  };

  try {
    const response = await fetch('/api/user/logout', options);

    if (response.status >= 300) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const getUser = async () => {
  try {
    const data = await userFetcher('/api/user');

    return {
      user: data?.user ?? {},
      error: null,
    };
  } catch (error) {
    return { user: null, error };
  }
};

const userFetcher = async (url: string) => {
  const options = {
    method: 'GET',
    headers: { credentials: 'include' },
  };

  const response = await fetch(url, options);

  if (response.status >= 300) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to get user');
  }

  return await response.json();
};

const _getUserResponse = async (token: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${process.env.BACKEND_API_ENDPOINT}/user`, options);
};
