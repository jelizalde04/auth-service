const jwtService = require("../services/jwtService");
const encryptionService = require("../services/encryptionService");
const axiosService = require("../services/axiosService");
const User = require("../models/User");

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        // Encrypt password before saving
        const hashedPassword = await encryptionService.hash(password);

        // Create new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwtService.generateToken({ id: newUser.id, email: newUser.email });

        // Notify other microservices via WebHook
        axiosService.sendWebhook("http://email-service:1004/webhook", { userId: newUser.id });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { register };
