import React from 'react';

interface WrapperProps { }

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="flex h-main justify-center">
      <div className="m-auto">
        <div className="w-96 py-4 px-7 shadow-lg rounded-lg">
          {children}
        </div>
      </div>
    </div>
  )
}