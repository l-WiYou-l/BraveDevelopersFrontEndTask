import type { NextApiRequest, NextApiResponse } from 'next'
import { operators } from '../data/operators'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (typeof id === "string") {
    const operator = operators.find(operator => operator.id === parseInt(id))

    res.status(200).json(operator)
  }
}

export default handler;