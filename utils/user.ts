import { USER_SIGNUP_API_ENDPOINT } from "./constants";

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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