const jwt = require('jsonwebtoken');
const StatusCodes = require('../utils/statusCodes');

const authAdminMiddleware = (req, res, next) => {
    const Header = req.headers['authorization'];

    if (!Header || !Header.startsWith('Bearer')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'No token provided'});
    }

    const token = Header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //{userId: ..., email: ... }

        //check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({message: 'Access denied. Admins only.'});
        }
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Invalid or expired token'});
    }
}

module.exports = authAdminMiddleware;