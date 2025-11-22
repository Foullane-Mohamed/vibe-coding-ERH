const express = require('express');
const router = express.Router();
const { createLabOrder, getLabOrders, updateLabOrder } = require('./labOrder.controller');
const { protect, authorize } = require('../../middleware/authMiddleware');
const { createLabOrderValidator, updateLabOrderValidator } = require('../../validators/lab.validator');
const validate = require('../../middleware/validate');

router.route('/')
  .post(protect, authorize('doctor'), createLabOrderValidator, validate, createLabOrder)
  .get(protect, getLabOrders);

router.route('/:id')
  .put(protect, authorize('lab_technician', 'admin'), updateLabOrderValidator, validate, updateLabOrder);

module.exports = router;
