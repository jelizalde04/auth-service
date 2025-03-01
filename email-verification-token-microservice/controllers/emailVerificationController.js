const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../services/emailService');

exports.requestEmailVerification = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        // Generar token de verificación
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.verificationToken = verificationToken;
        user.verificationTokenExpiry = Date.now() + 3600000; // 1 hora

        await user.save();

        // Enviar email con el enlace de verificación
        const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
        sendEmail(user.email, "Email Verification", `Click the link to verify your email: ${verificationLink}`);

        res.status(200).json({ message: "Verification link sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiry = null;

        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
