import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { postId, title, content } = req.body;

    try {
      const db = await connectToDatabase();
      await db.execute('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId]);
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}