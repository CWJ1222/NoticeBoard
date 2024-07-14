import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './db';
import bcrypt from 'bcrypt';

interface User {
  id: number;
  email: string;
  password: string;
}

export const signUpUser = async (email: string, password: string) => {
  const db = await connectToDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
  return result;
};

export const signInUser = async (email: string, password: string) => {
  const db = await connectToDatabase();
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]) as [User[], any];
  if (rows.length === 0) {
    throw new Error('User not found');
  }

  const user = rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Add your token generation or session handling logic here
  return user;
};