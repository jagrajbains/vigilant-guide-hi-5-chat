import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
            req.user = decoded as AuthUser; // Attach decoded token to request object
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export default authMiddleware;