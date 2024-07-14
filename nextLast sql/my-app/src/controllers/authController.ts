import { Request, Response } from 'express';
import db from '../models/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

// Function to sign up a user
export const signUp = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'User created' });
};

// Function to sign in a user
export const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0) {
        const user = rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            res.status(200).json({ message: 'Sign in successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};