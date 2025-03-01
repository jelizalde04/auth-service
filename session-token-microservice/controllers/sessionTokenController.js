const TokenService = require('../services/tokenService');

exports.createToken = async (req, res) => {
  try {
    const { userId } = req.body;
    const token = await TokenService.generateToken(userId);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    const valid = await TokenService.verifyToken(token);
    res.status(200).json({ valid });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.revokeToken = async (req, res) => {
  try {
    const { token } = req.body;
    await TokenService.revokeToken(token);
    res.status(200).json({ message: "Token revoked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
