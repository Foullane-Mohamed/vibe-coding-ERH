const { body } = require('express-validator');

const createAppointmentValidator = [
  body('patientId').isMongoId().withMessage('Valid patient ID is required'),
  body('doctorId').isMongoId().withMessage('Valid doctor ID is required'),
  body('startTime').isISO8601().toDate().withMessage('Valid start time is required'),
  body('endTime').isISO8601().toDate().withMessage('Valid end time is required')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startTime)) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  body('reason').notEmpty().withMessage('Reason for appointment is required'),
  body('type').isIn(['Consultation', 'Follow-up', 'Routine Checkup', 'Emergency']).withMessage('Invalid appointment type'),
];

const updateAppointmentStatusValidator = [
  body('status').isIn(['scheduled', 'completed', 'cancelled', 'no-show']).withMessage('Invalid status'),
];

module.exports = { createAppointmentValidator, updateAppointmentStatusValidator };
