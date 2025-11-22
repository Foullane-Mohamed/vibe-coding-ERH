const Patient = require('./patient.model');

const createPatient = async (patientData, userId) => {
  const patient = new Patient({
    ...patientData,
    createdBy: userId,
  });

  return await patient.save();
};

const getPatients = async (searchQuery) => {
  let query = {};

  if (searchQuery) {
    query = { $text: { $search: searchQuery } };
  }

  return await Patient.find(query).sort({ createdAt: -1 });
};

const getPatientById = async (id) => {
  return await Patient.findById(id);
};

const updatePatient = async (id, updateData) => {
  const patient = await Patient.findById(id);

  if (!patient) {
    throw new Error('Patient not found');
  }

  Object.assign(patient, updateData);
  return await patient.save();
};

module.exports = { createPatient, getPatients, getPatientById, updatePatient };
