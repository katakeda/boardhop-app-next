import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '../../contexts/AuthContext';
import { Order } from '../../types/common';
import { currencyFormat, getOrderStatusData } from '../../utils/common';
import { getOrders } from '../../utils/frontend/orders';
import { DefaultLoading } from '../Common/DefaultLoading';

export const DashboardOrders: React.FC = () => {
  const user = useAuthContext((value) => value.state.user);
  const [orders, setOrders] = useState<Array<Order> | null>(null);

  useEffect(() => {
    if (user) {
      (async () => {
        const { orders } = await getOrders();
        setOrders(orders);
      })();
    }
  }, [user]);

  if (!orders) {
    return <DefaultLoading />;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="py-6 px-8">
        {orders.length < 1 && (
          <div className="flex flex-col items-center space-y-3 mt-8">
            <p className="font-sans text-gray-400">
              現在、表示する注文履歴がありません
            </p>
            <Link href={'/posts'} passHref>
              <a className="text-sm text-blue-500 underline">商品を探す</a>
            </Link>
          </div>
        )}
        {orders.length > 0 && (
          <>
            <div className="flex pt-2 border-b-4 border-gray-300 bg-gray-300 rounded-t-md">
              {['詳細', '金額', 'ステータス', '日付'].map(
                (header: string, index) => (
                  <span
                    key={index}
                    className="flex justify-center w-1/4 text-sm text-gray-700 font-sans"
                  >
                    {header}
                  </span>
                )
              )}
            </div>
            {orders.map((order, index) => {
              const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-300';
              const [orderStatus, statusClass] = getOrderStatusData(
                order.status
              );
              return (
                <div
                  key={order.id}
                  className={`flex items-center py-2 ${bgColor}`}
                >
                  <span className="flex justify-center w-1/4">
                    <Link href={`/user/receipts/${order.id}`} passHref>
                      <a className="text-sm text-blue-500 underline">詳細</a>
                    </Link>
                  </span>
                  <span className="flex justify-center w-1/4 text-sm text-gray-500">
                    {currencyFormat(order.total)}円
                  </span>
                  <span className="flex justify-center w-1/4">
                    <span
                      className={`flex justify-center w-20 p-1 rounded-md text-sm text-white ${statusClass}`}
                    >
                      {orderStatus}
                    </span>
                  </span>
                  <span className="flex justify-center w-1/4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
