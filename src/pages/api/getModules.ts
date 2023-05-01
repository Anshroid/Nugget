import type { NextApiRequest, NextApiResponse } from 'next'
import {readdirSync} from "fs";

type Data = {
  modules: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ modules: readdirSync('./modules') });
}
