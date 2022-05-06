import React from 'react';

interface DefaultErrorProps {}

export const DefaultError: React.FC<DefaultErrorProps> = () => {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <span>Oops! Something went wrong...</span>
    </div>
  );
};
