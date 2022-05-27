import { OrderStatus } from "../types/common";

export const currencyFormat = (amount: number | string): string => {
  return amount.toLocaleString('ja-JP');
}

export const sortByNewest = (a: { createdAt: Date }, b: { createdAt: Date }) => {
  return a.createdAt > b.createdAt ? -1 : 1;
}

export const getOrderStatusData = (status: string) => {
  let orderStatus, statusClass;
  switch (status) {
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

  return [orderStatus, statusClass];
}