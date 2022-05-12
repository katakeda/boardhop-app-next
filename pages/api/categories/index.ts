import type { NextApiRequest, NextApiResponse } from 'next';
import { Category, ResponseData } from '../../../types/common';

type GetData = {
  categories: Array<Category>;
} & ResponseData;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  switch (req.method) {
    case 'GET':
    default:
      return handleGet(req, res);
  }
};

const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse<GetData>
) => {
  const options = { method: 'GET' };
  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/categories`,
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ categories: [], error: response.statusText });
  }

  const categories = await response.json();

  return res.status(200).json({ categories });
};

export default handler;
