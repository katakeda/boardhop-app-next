import React, { PropsWithChildren } from 'react';

export const DisabledContainer: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="relative">
      <div className="absolute z-40 h-full w-full">
        <div className="absolute bg-black opacity-60 h-full w-full"></div>
        <div className="absolute h-full w-full">
          <div className="flex items-center justify-center h-full text-white">
            メンテナンス中
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
