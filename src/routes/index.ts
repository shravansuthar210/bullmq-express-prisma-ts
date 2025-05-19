import { Router } from 'express';
import fileRouter from './file';
import authRouter from './user'
import authMiddleware from '../middleware/auth.middleware';

const router = Router();


router.use("/auth", authRouter)
router.use("/file", authMiddleware, fileRouter)

export default router;