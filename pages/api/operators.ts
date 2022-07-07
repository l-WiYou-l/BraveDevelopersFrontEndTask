import type { NextApiRequest, NextApiResponse } from 'next'
import { operators } from './data/operators'
import {TResponseOperatorsData} from "../../types/TResponseOperatorsData";
 

const handler = (req: NextApiRequest, res: NextApiResponse<TResponseOperatorsData[]>) => {
  res.status(200).json(operators)
}

export default handler;