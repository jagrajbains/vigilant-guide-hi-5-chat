import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/AuthMiddleware';
import ChatGroupController from '../controllers/ChatGroupController';

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/chat-group', authMiddleware, ChatGroupController.create);
router.get('/chat-group', authMiddleware, ChatGroupController.index);
router.get('/chat-group/:id', authMiddleware, ChatGroupController.show);
router.put('/chat-group/:id', authMiddleware, ChatGroupController.update);
router.delete('/chat-group/:id', authMiddleware, ChatGroupController.destroy);

export default router;
