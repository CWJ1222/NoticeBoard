import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/db';
import { hashPassword } from '../../../utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    await connection.query('INSERT INTO users (email, password, coin) VALUES (?, ?, ?)', [email, hashedPassword, 0]);

    res.status(201).json({ message: 'User created' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;