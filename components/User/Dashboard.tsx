import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { DefaultLoading } from '../Common/DefaultLoading';
import { DashboardHome } from './DashboardHome';
import { DashboardOrders } from './DashboardOrders';
import { DashboardPosts } from './DashboardPosts';

enum TabOption {
  HOME = 'home',
  POSTS = 'posts',
  ORDERS = 'orders',
}

const tabs = [
  { id: TabOption.HOME, label: 'ホーム', component: <DashboardHome /> },
  { id: TabOption.POSTS, label: '投稿一覧', component: <DashboardPosts /> },
  { id: TabOption.ORDERS, label: 'レシート', component: <DashboardOrders /> },
];

export const Dashboard: React.FC = () => {
  // Make sure we don't get value.state and destructure { user }
  // since this will cause the component to listen for all state changes
  const user = useAuthContext((value) => value.state.user);
  const [tabId, setTabId] = useState<string>(TabOption.HOME);

  if (!user) {
    return <DefaultLoading />;
  }

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="inline-flex justify-start mt-16">
        {tabs.map((tab, index) => {
          const bgColor = tabId === tab.id ? 'bg-white' : 'bg-gray-300';
          return (
            <span
              key={index}
              className={`px-8 py-2 rounded-t-xl border border-t-gray-400 border-r-gray-400 ${bgColor}`}
              onClick={() => setTabId(tab.id)}
            >
              {tab.label}
            </span>
          );
        })}
      </div>
      <div className="flex w-full h-main bg-white">
        {tabs.find((tab) => tab.id === tabId)?.component}
      </div>
    </div>
  );
};
