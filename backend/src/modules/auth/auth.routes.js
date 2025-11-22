const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('./auth.controller');
const { registerValidator, loginValidator } = require('../../validators/auth.validator');
const validate = require('../../middleware/validate');

router.post('/login', loginValidator, validate, loginUser);

router.post('/register', registerValidator, validate, registerUser);

module.exports = router;
