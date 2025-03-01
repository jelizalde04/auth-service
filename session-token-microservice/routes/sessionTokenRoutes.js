const express = require('express');
const router = express.Router();
const sessionTokenController = require('../controllers/sessionTokenController');

router.post('/create', sessionTokenController.createToken);
router.post('/verify', sessionTokenController.verifyToken);
router.delete('/revoke', sessionTokenController.revokeToken);

module.exports = router;
