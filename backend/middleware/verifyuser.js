import jwt from 'jsonwebtoken'
import { User } from "../models/user.js"

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const user = await User.findById(decodedToken.userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Token verification failed', error: error.message });
    }
}

export default verifyUser