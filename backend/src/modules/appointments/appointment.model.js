const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  reason: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

// Index for conflict detection
appointmentSchema.index({ doctor: 1, startTime: 1, endTime: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
