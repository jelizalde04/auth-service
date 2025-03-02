const jwtService = require("../services/jwtService");
const encryptionService = require("../services/encryptionService");
const emailService = require("../services/emailService");
const User = require("../models/User");

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Encrypt new password
        const hashedPassword = await encryptionService.hash(newPassword);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        // Send confirmation email
        await emailService.sendEmail(user.email, "Password Reset", "Your password has been updated.");

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { resetPassword };
