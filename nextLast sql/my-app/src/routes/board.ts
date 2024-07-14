import { Router } from 'express';
import { createPost, editPost, getPosts, getPostById } from '../controllers/boardController';

const router = Router();

router.post('/write', createPost);
router.put('/edit/:id', editPost);
router.get('/', getPosts);
router.get('/:id', getPostById);

export default router;