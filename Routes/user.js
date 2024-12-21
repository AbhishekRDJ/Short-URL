const express = require('express');
const { handelUserSignup, handelUserLogin } = require('../Controllers/user');

const router = express.Router();

// Route for user signup
router.post('/', handelUserSignup);

// Route for user login
router.post('/login', handelUserLogin);

module.exports = router;
