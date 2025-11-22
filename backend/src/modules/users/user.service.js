const User = require('./user.model');
const bcrypt = require('bcrypt');

/**
 * Create a new user
 * @param {Object} userData
 * @returns {Promise<User>}
 */
const createUser = async (userData) => {
  const { email } = userData;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create(userData);
  return user;
};

/**
 * Get all users with pagination and search
 * @param {Object} query
 * @returns {Promise<Array<User>>}
 */
const getUsers = async (query) => {
  const { search } = query;
  let filter = {};

  if (search) {
    filter = {
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };
  }

  const users = await User.find(filter).select('-password');
  return users;
};

/**
 * Get user by ID
 * @param {string} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  return user;
};

/**
 * Update user
 * @param {string} id
 * @param {Object} updateData
 * @returns {Promise<User>}
 */
const updateUser = async (id, updateData) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  // Prevent password update through this route if needed, or handle it separately
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  return updatedUser;
};

/**
 * Delete user
 * @param {string} id
 * @returns {Promise<void>}
 */
const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  await user.deleteOne();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
