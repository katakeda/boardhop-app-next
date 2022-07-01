import React from 'react';
import { AppProvider } from '../../contexts/AppContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { DefaultFooter } from '../Footer/DefaultFooter';
import { DefaultHeader } from '../Header/DefaultHeader';

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <div className="flex flex-col">
          <header className="h-header">
            <DefaultHeader />
          </header>
          <main className="h-main">
            {children}
          </main>
          <footer className="h-footer">
            <DefaultFooter />
          </footer>
        </div>
      </AuthProvider>
    </AppProvider>
  );
};
