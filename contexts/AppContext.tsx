import React, { createContext, useContext, useState } from 'react';
import type { ErrorString } from '../types/common';

interface AppData {
  title: string;
  loading: boolean;
  error: string | null;
  toggleLoading: (flag: boolean) => void;
  toggleError: (error: ErrorString) => void;
}

const AppContext: React.Context<AppData> = createContext({} as AppData);

export const AppProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorString>(null);

  const toggleLoading = (flag: boolean): void => setLoading(flag);

  const toggleError = (error: ErrorString): void => setError(error);

  const initialData = {
    title: 'BoardHop',
    loading, toggleLoading,
    error, toggleError,
  }

  return (
    <AppContext.Provider value={initialData}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);