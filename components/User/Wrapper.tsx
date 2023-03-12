import React, { PropsWithChildren } from 'react';

export const Wrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex h-main justify-center">
      <div className="m-auto">
        <div className="w-96 py-4 px-7 shadow-lg rounded-lg">{children}</div>
      </div>
    </div>
  );
};
