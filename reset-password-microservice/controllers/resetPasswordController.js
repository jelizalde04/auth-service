const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendEmail = require('../services/emailService');

exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generar token de recuperación
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hora

        await user.save();

        // Enviar email con el enlace de recuperación
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        sendEmail(user.email, "Password Reset Request", `Click the link to reset your password: ${resetLink}`);

        res.status(200).json({ message: "Reset link sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hashear la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = null;
        user.resetTokenExpiry = null;

        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
