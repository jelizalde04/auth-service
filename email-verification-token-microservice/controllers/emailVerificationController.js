const jwtService = require("../services/jwtService");
const emailService = require("../services/emailService");
const User = require("../models/User");

const sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate verification token
        const token = jwtService.generateToken({ email });

        // Send verification email
        await emailService.sendEmail(email, "Email Verification", `Your token: ${token}`);

        res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const verifyToken = async (req, res) => {
    try {
        const { token } = req.body;

        // Verify JWT token
        const decoded = jwtService.verifyToken(token);
        if (!decoded) return res.status(400).json({ error: "Invalid token" });

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { sendVerificationEmail, verifyToken };
