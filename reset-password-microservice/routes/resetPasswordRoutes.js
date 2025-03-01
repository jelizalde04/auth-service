const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/resetPasswordController');

const router = express.Router();

router.post('/request', requestPasswordReset);
router.post('/reset', resetPassword);

module.exports = router;
