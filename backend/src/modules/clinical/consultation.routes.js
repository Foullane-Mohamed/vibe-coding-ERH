const express = require('express');
const router = express.Router();
const { createConsultation, getConsultationById, getPatientConsultations } = require('./consultation.controller');
const { protect, authorize } = require('../../middleware/authMiddleware');
const { createConsultationValidator } = require('../../validators/clinical.validator');
const validate = require('../../middleware/validate');

router.route('/')
  .post(protect, authorize('doctor'), createConsultationValidator, validate, createConsultation);

router.route('/:id')
  .get(protect, getConsultationById);

router.route('/patient/:patientId')
  .get(protect, getPatientConsultations);

module.exports = router;
