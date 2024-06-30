import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secure-secret-key'; // Ensure this is a proper string

export const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Use the correct secret key
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
};

// Function that will generate the jwt token
export const generateToken = (userData) => {
    return jwt.sign(userData, SECRET_KEY); // Use the correct secret key
};
