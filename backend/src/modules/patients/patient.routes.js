const express = require('express');
const router = express.Router();
const { createPatient, getPatients, getPatientById, updatePatient } = require('./patient.controller');
const { protect, authorize } = require('../../middleware/authMiddleware');
const { createPatientValidator, updatePatientValidator } = require('../../validators/patient.validator');
const validate = require('../../middleware/validate');

router.route('/')
  .post(protect, authorize('admin', 'doctor', 'nurse', 'secretary'), createPatientValidator, validate, createPatient)
  .get(protect, getPatients);

router.route('/:id')
  .get(protect, getPatientById)
  .put(protect, authorize('admin', 'doctor', 'nurse', 'secretary'), updatePatientValidator, validate, updatePatient);

module.exports = router;
