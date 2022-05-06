import React from 'react';

interface DefaultLoadingProps {}

export const DefaultLoading: React.FC<DefaultLoadingProps> = () => {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <span>Loading...</span>
    </div>
  );
};
