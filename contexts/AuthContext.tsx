import React, { useEffect, useReducer } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import type { User } from '../types/common';
import { getUser } from '../utils/user';

export enum Action {
  SET_USER = 'SET_USER',
}

export type IAction = {
  type: Action.SET_USER;
  payload: User | null;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface AuthContextValue {
  state: AuthState;
  dispatch: React.Dispatch<IAction>;
}

// Use generic function type to avoid using () => any
export type Selector<T> = (value: AuthContextValue) => T;

export const AuthContext = createContext({} as AuthContextValue);

const reducer = (state: AuthState, action: IAction) => {
  switch (action.type) {
    case Action.SET_USER:
      return { ...state, isLoggedIn: action.payload !== null, user: action.payload };
    default:
      // throw new Error("Invalid reducer action");
      // Change IAction.payload to any if you want to enable error throwing
      return state;
  }
}

const initialData = { user: null, isLoggedIn: false }

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    if (state.user === null) {
      (async () => {
        const { user } = await getUser();
        dispatch({ type: Action.SET_USER, payload: user });
      })();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// Can't create generic arrow function in tsx
// so we use standard syntax
export function useAuthContext<T>(selector: Selector<T>) {
  return useContextSelector(AuthContext, selector);
}