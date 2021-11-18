import React from 'react';
import { DefaultNavbar } from './DefaultNavbar';

interface DefaultHeaderProps {

}

export const DefaultHeader: React.FC<DefaultHeaderProps> = () => {
  return (
    <div className="bg-white">
      <DefaultNavbar />
    </div>
  );
}