const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }
    try {
        req.token = token
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token is invalid' });
    }
};

module.exports = verifyToken;
