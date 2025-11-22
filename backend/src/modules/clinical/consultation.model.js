const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
    unique: true,
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
  vitals: {
    bloodPressure: String, // e.g. 120/80
    heartRate: Number,
    temperature: Number,
    weight: Number, // kg
    height: Number, // cm
    oxygenSaturation: Number,
  },
  diagnosis: [{
    code: String, // ICD-10 or similar
    description: String,
    type: { type: String, enum: ['primary', 'secondary'] },
  }],
  procedures: [{
    code: String,
    description: String,
  }],
  notes: String,
}, {
  timestamps: true,
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;
