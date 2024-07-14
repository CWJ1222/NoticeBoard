import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Update coins for all posts, decrement by 1 but not below 0
      await connection.query('UPDATE posts SET coin = GREATEST(0, coin - 1)');
      res.status(200).json({ message: 'Coins decremented successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;