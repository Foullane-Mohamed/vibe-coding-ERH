const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  consultation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  medications: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    route: { type: String }, // e.g. oral, iv
  }],
  status: {
    type: String,
    enum: ['draft', 'signed', 'sent', 'dispensed'],
    default: 'draft',
  },
  pharmacy: {
    type: String, // Name or ID of pharmacy
  },
  notes: String,
}, {
  timestamps: true,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
