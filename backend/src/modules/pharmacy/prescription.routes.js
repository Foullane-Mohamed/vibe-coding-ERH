const express = require('express');
const router = express.Router();
const { createPrescription, getPrescriptions, updatePrescriptionStatus } = require('./prescription.controller');
const { protect, authorize } = require('../../middleware/authMiddleware');
const { createPrescriptionValidator } = require('../../validators/pharmacy.validator');
const validate = require('../../middleware/validate');

router.route('/')
  .post(protect, authorize('doctor'), createPrescriptionValidator, validate, createPrescription)
  .get(protect, getPrescriptions);

router.route('/:id/status')
  .put(protect, authorize('pharmacist'), updatePrescriptionStatus);

module.exports = router;
