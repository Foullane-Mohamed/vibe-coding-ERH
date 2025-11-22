const authService = require('./auth.service');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    if (error.message === 'Invalid email or password' || error.message === 'Account suspended') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.message === 'User already exists') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { loginUser, registerUser };
