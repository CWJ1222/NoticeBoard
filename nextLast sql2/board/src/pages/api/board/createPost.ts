import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, title, content } = req.body;

    try {
      const db = await connectToDatabase();
      await db.execute('INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)', [userId, title, content]);
      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}