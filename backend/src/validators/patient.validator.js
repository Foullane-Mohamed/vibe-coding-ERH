const { body } = require('express-validator');

const createPatientValidator = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth').isISO8601().toDate().withMessage('Valid date of birth is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zipCode').notEmpty().withMessage('Zip code is required'),
  body('emergencyContact.name').notEmpty().withMessage('Emergency contact name is required'),
  body('emergencyContact.phone').notEmpty().withMessage('Emergency contact phone is required'),
  body('emergencyContact.relation').notEmpty().withMessage('Emergency contact relation is required'),
];

const updatePatientValidator = [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('dateOfBirth').optional().isISO8601().toDate().withMessage('Valid date of birth is required'),
  body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
];

module.exports = { createPatientValidator, updatePatientValidator };
