const mongoose = require('mongoose');

const labOrderSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tests: [{
    name: String,
    code: String,
  }],
  status: {
    type: String,
    enum: ['ordered', 'sample_collected', 'processing', 'completed'],
    default: 'ordered',
  },
  results: [{
    testName: String,
    value: String,
    unit: String,
    referenceRange: String,
    fileUrl: String, // MinIO URL
  }],
  notes: String,
}, {
  timestamps: true,
});

const LabOrder = mongoose.model('LabOrder', labOrderSchema);

module.exports = LabOrder;
