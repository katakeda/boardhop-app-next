import React from 'react';

export const DashboardHome: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center p-4 w-96 h-64 rounded-md shadow-md border border-gray-100">
        <span className="font-sans text-lg text-gray-400">
          新着情報はありません
        </span>
      </div>
    </div>
  );
};
