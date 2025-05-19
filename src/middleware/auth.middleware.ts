import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY"
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = (decoded as any).id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return
  }
};
export default authMiddleware