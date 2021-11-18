import React from 'react';

interface DefaultFooterProps {

}

export const DefaultFooter: React.FC<DefaultFooterProps> = () => {
  return (
    <div className="text-center text-gray-500">
      <p>Footer</p>
    </div>
  );
}