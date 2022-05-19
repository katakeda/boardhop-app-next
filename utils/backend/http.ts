import { NextApiRequest, NextApiResponse } from "next";

export const methodNotAllowed = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(405).send('Method not allowed');
}