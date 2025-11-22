const { body } = require('express-validator');

const createPrescriptionValidator = [
  body('consultationId').isMongoId().withMessage('Valid consultation ID is required'),
  body('medications').isArray({ min: 1 }).withMessage('At least one medication is required'),
  body('medications.*.name').notEmpty().withMessage('Medication name is required'),
  body('medications.*.dosage').notEmpty().withMessage('Dosage is required'),
  body('medications.*.frequency').notEmpty().withMessage('Frequency is required'),
  body('medications.*.duration').notEmpty().withMessage('Duration is required'),
];

module.exports = { createPrescriptionValidator };
