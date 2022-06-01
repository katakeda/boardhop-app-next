import type { NextApiRequest, NextApiResponse } from 'next';
import { Message, ResponseData } from '../../../types/common';
import { methodNotAllowed } from '../../../utils/backend/http';

type MessageData = {
  message: Message | null;
} & ResponseData;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return methodNotAllowed(req, res);
  }
};

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<MessageData>
) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  };

  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/messages`,
    options
  );

  if (response.status >= 400) {
    return res
      .status(response.status)
      .json({ message: null, error: response.statusText });
  }

  const message = await response.json();

  return res.status(200).json({ message });
};

export default handler;
