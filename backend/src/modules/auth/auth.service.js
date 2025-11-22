const User = require('../users/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    if (!user.isActive) {
      throw new Error('Account suspended');
    }

    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

const register = async (userData) => {
  const { firstName, lastName, email, password, role } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: role || 'patient',
  });

  if (user) {
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

module.exports = { login, register };
