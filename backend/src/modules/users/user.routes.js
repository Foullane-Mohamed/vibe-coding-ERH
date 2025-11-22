const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('./user.controller');
const { protect, authorize } = require('../../middleware/authMiddleware');
const { createUserValidator, updateUserValidator } = require('../../validators/user.validator');
const validate = require('../../middleware/validate');

router.route('/')
  .post(protect, authorize('admin'), createUserValidator, validate, createUser)
  .get(protect, authorize('admin'), getUsers);

router.route('/:id')
  .get(protect, authorize('admin'), getUserById)
  .put(protect, authorize('admin'), updateUserValidator, validate, updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
