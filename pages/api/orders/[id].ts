import type { NextApiRequest, NextApiResponse } from 'next';
import { Order, ResponseData } from '../../../types/common';

type GetData = {
  order: Order | null;
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
    `${process.env.BACKEND_API_ENDPOINT}/orders/${req.query.id}`,
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ order: null, error: response.statusText });
  }

  const order = await response.json();

  res.status(200).json({ order });
};

export default handler;
