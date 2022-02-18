import React from 'react';
import { AppProvider } from '../../contexts/AppContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { DefaultFooter } from '../Footer/DefaultFooter';
import { DefaultHeader } from '../Header/DefaultHeader';

interface DefaultLayoutProps { }

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <div className="flex flex-col h-screen">
          <header className="h-header"><DefaultHeader /></header>
          <main className="h-main">{children}</main>
          <footer className="h-footer"><DefaultFooter /></footer>
        </div>
      </AuthProvider>
    </AppProvider>
  );
}