const Prescription = require('./prescription.model');
const Consultation = require('../clinical/consultation.model');

const createPrescription = async (prescriptionData, userId) => {
  const { consultationId, medications, notes } = prescriptionData;

  const consultation = await Consultation.findById(consultationId);
  if (!consultation) {
    throw new Error('Consultation not found');
  }

  return await Prescription.create({
    consultation: consultationId,
    doctor: userId,
    patient: consultation.patient,
    medications,
    notes,
    status: 'signed', // Auto-sign for simplicity in this demo
  });
};

const getPrescriptions = async (user) => {
  let query = {};

  if (user.role === 'patient') {
    query.patient = user._id;
  } else if (user.role === 'doctor') {
    query.doctor = user._id;
  }

  return await Prescription.find(query)
    .populate('doctor', 'firstName lastName')
    .populate('patient', 'firstName lastName')
    .sort({ createdAt: -1 });
};

const updatePrescriptionStatus = async (id, status) => {
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    throw new Error('Prescription not found');
  }

  prescription.status = status;
  return await prescription.save();
};

module.exports = { createPrescription, getPrescriptions, updatePrescriptionStatus };
