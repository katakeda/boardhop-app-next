import type { NextApiRequest, NextApiResponse } from 'next';
import { Order, ResponseData } from '../../../types/common';

type GetData = {
  orders: Array<Order> | null;
} & ResponseData;

const handler = async (req: NextApiRequest, res: NextApiResponse<GetData>) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.cookies.boardhop_auth}`,
    },
  };
  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/orders`,
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ orders: null, error: response.statusText });
  }

  const orders = await response.json();

  res.status(200).json({ orders });
};

export default handler;
