const { body } = require('express-validator');

const createUserValidator = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'doctor', 'nurse', 'secretary', 'patient', 'pharmacist', 'lab_technician']).withMessage('Invalid role'),
];

const updateUserValidator = [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('role').optional().isIn(['admin', 'doctor', 'nurse', 'secretary', 'patient', 'pharmacist', 'lab_technician']).withMessage('Invalid role'),
];

module.exports = { createUserValidator, updateUserValidator };
