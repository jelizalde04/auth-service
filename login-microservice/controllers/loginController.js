const jwtService = require("../services/jwtService");
const encryptionService = require("../services/encryptionService");
const axiosService = require("../services/axiosService");
const User = require("../models/User");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Verify password
        const isMatch = await encryptionService.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        // Generate JWT token
        const token = jwtService.generateToken({ id: user.id, email: user.email });

        // Notify another microservice using WebHook
        axiosService.sendWebhook("http://email-service:1004/webhook", { userId: user.id });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { login };
