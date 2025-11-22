const Consultation = require('./consultation.model');
const Appointment = require('../appointments/appointment.model');

const createConsultation = async (consultationData, userId) => {
  const { appointmentId, vitals, diagnosis, procedures, notes } = consultationData;

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new Error('Appointment not found');
  }

  if (appointment.doctor.toString() !== userId.toString()) {
    throw new Error('Not authorized to create consultation for this appointment');
  }

  const consultation = await Consultation.create({
    appointment: appointmentId,
    doctor: userId,
    patient: appointment.patient,
    vitals,
    diagnosis,
    procedures,
    notes,
  });

  // Update appointment status to completed
  appointment.status = 'completed';
  await appointment.save();

  return consultation;
};

const getConsultationById = async (id) => {
  return await Consultation.findById(id)
    .populate('appointment')
    .populate('doctor', 'firstName lastName')
    .populate('patient', 'firstName lastName');
};

const getPatientConsultations = async (patientId) => {
  return await Consultation.find({ patient: patientId })
    .populate('doctor', 'firstName lastName')
    .sort({ createdAt: -1 });
};

module.exports = { createConsultation, getConsultationById, getPatientConsultations };
