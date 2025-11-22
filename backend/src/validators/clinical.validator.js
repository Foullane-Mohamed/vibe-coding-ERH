const { body } = require('express-validator');

const createConsultationValidator = [
  body('appointmentId').isMongoId().withMessage('Valid appointment ID is required'),
  body('vitals.height').optional().isNumeric(),
  body('vitals.weight').optional().isNumeric(),
  body('vitals.bloodPressure').optional().matches(/^\d{2,3}\/\d{2,3}$/).withMessage('Invalid blood pressure format (e.g., 120/80)'),
  body('vitals.temperature').optional().isNumeric(),
  body('diagnosis').isArray().withMessage('Diagnosis must be an array'),
  body('diagnosis.*.code').notEmpty().withMessage('Diagnosis code is required'),
  body('diagnosis.*.description').notEmpty().withMessage('Diagnosis description is required'),
];

module.exports = { createConsultationValidator };
