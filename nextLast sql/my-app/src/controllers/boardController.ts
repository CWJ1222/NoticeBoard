import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2/promise';
import db from '../models/db';

export const createPost = async (req: Request, res: Response) => {
    const { title, content, userId } = req.body;

    const [rows] = await db.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);
    res.status(201).json({ message: 'Post created' });
};

export const editPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const [rows] = await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    res.status(200).json({ message: 'Post updated' });
};

export const getPosts = async (req: Request, res: Response) => {
    const [rows] = await db.query('SELECT * FROM posts');
    res.status(200).json(rows);
};


export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;

    // Assuming `db` is an instance of a mysql2 connection
    const [rows]: [RowDataPacket[], any] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);

    if (rows.length > 0) {
        res.status(200).json(rows[0]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};