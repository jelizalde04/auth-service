const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "super_secure_secret";

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
