import React from 'react';

interface DefaultLoadingProps {}

export const DefaultLoading: React.FC<DefaultLoadingProps> = () => {
  return (
    <div className="flex flex-col h-main w-full justify-center items-center">
      <span className="animate-pulse">Loading...</span>
    </div>
  );
};
