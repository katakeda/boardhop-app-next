import React from 'react';

export const DefaultFooter: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-footer text-center text-sm text-gray-400">
      <p>Copyright © {(new Date()).getFullYear()} Boardhop</p>
    </div>
  );
}