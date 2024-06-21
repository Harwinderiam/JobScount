import { verifyJWT } from '../utils/tokenUtils.js';
export const authenticateUser = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        res.status(401).json({ msg: 'Authentication Invalid' });
    }
    try {
        const data = verifyJWT(token);
        console.log('Token data:', data); 
        const { userId, role } = data;
        if (!userId || !role) {
            return res.status(401).json({ msg: 'Authentication Invalid' });
        }
        req.user = { userId, role };
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ msg: 'Authentication Invalid' });
    }

};