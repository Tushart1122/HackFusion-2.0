const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    // If token has "Bearer " prefix, remove it
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trim();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;  // or req.user if it applies to students, etc.
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = authMiddleware;
