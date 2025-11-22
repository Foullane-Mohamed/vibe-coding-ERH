const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment } = require('./appointment.controller');
const { protect, authorize } = require('../../middleware/authMiddleware');
const { createAppointmentValidator, updateAppointmentStatusValidator } = require('../../validators/appointment.validator');
const validate = require('../../middleware/validate');

router.route('/')
  .post(protect, authorize('patient', 'secretary'), createAppointmentValidator, validate, createAppointment)
  .get(protect, getAppointments);

router.route('/:id')
  .put(protect, authorize('doctor', 'secretary', 'admin'), updateAppointmentStatusValidator, validate, updateAppointment);

module.exports = router;
