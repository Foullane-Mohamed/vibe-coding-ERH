const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  email: { type: String, trim: true },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  allergies: [{ type: String }],
  medicalHistory: [{ type: String }], // Chronic conditions, etc.
  insurances: [{
    provider: String,
    policyNumber: String,
    validUntil: Date,
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

// Index for search
patientSchema.index({ firstName: 'text', lastName: 'text', phone: 'text' });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
