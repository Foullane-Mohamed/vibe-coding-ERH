const { body } = require('express-validator');

const createLabOrderValidator = [
  body('patientId').isMongoId().withMessage('Valid patient ID is required'),
  body('tests').isArray({ min: 1 }).withMessage('At least one test is required'),
  body('tests.*.name').notEmpty().withMessage('Test name is required'),
  body('tests.*.code').optional(),
];

const updateLabOrderValidator = [
  body('status').optional().isIn(['pending', 'in-progress', 'completed', 'cancelled']).withMessage('Invalid status'),
  body('results').optional().isArray(),
];

module.exports = { createLabOrderValidator, updateLabOrderValidator };
