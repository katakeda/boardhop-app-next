import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData, Tag } from '../../../types/common';

type GetData = {
  tags: Array<Tag>;
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
    `${process.env.BACKEND_API_ENDPOINT}/tags?type=${req.query.type}`,
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ tags: [], error: response.statusText });
  }

  const tags = await response.json();


  return res.status(200).json({ tags });
};

export default handler;
