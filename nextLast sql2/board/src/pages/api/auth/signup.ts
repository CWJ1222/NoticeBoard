import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const db = await connectToDatabase();
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
      res.status(200).json({ message: 'Sign up successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}