import React, { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Order, OrderStatus } from '../../types/common';
import { currencyFormat, sortByNewest } from '../../utils/common';
import { getOrder } from '../../utils/frontend/orders';
import { DefaultLoading } from '../Common/DefaultLoading';

export const ReceiptDetail: React.FC = () => {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const { order, error } = await getOrder(id);
      if (!error && order) {
        setOrder(order);
      }
    })();
  }, [id]);

  if (!order) {
    return <DefaultLoading />;
  }

  let orderStatus, statusClass;
  switch (order.status) {
    case OrderStatus.COMPLETE:
      orderStatus = '完了済み';
      statusClass = 'bg-green-500';
      break;
    case OrderStatus.PENDING:
      orderStatus = '処理中';
      statusClass = 'bg-yellow-500';
      break;
    case OrderStatus.CANCELED:
      orderStatus = '失敗';
      statusClass = 'bg-red-400';
      break;
    default:
      orderStatus = '不明';
      statusClass = 'bg-gray-400';
      break;
  }

  return (
    <div className="flex flex-col h-main items-center space-y-96">
      <div className="flex flex-col w-96 mt-8 shadow-md rounded-md border border-gray-100">
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-100">
          <span>題名：</span>
          <span>{order.post.title}</span>
        </div>
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-100">
          <span>お支払い金額：</span>
          <span>{currencyFormat(order.total)}円</span>
        </div>
        <div className="flex items-center justify-between p-4">
          <span>決済状況：</span>
          <span className={`p-2 rounded-md text-sm text-white ${statusClass}`}>
            {orderStatus}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-96 mb-16">
        <textarea
          className="w-full p-2 shadow-md rounded-md border border-gray-100"
          rows={3}
          placeholder="メッセージを書き込む"
        ></textarea>
        <button className="inline-flex items-center justify-center w-full p-2 mt-3 rounded-md shadow-sm text-white bg-primary-500 disabled:opacity-50">
          送信
        </button>
        {order.messages.sort(sortByNewest).map((msgObj) => (
          <div
            className="flex items-center space-x-5 w-full my-3"
            key={msgObj.id}
          >
            <span>
              {msgObj.avatarUrl ? (
                <span className="flex relative h-10 w-10 rounded-full border border-gray-300">
                  <Image
                    className="rounded-full"
                    src={msgObj.avatarUrl}
                    alt="user-avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                </span>
              ) : (
                <span className="flex items-center justify-center p-2 h-10 w-10 rounded-full border border-gray-300 bg-gray-100">
                  <UserIcon className="h-6 w-6" />
                </span>
              )}
            </span>
            <span className="w-full p-2 rounded-md shadow-md font-sans text-sm text-gray-700">
              {msgObj.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
