const patientService = require('./patient.service');

const createPatient = async (req, res) => {
  try {
    const patient = await patientService.createPatient(req.body, req.user._id);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPatients = async (req, res) => {
  const { search } = req.query;

  try {
    const patients = await patientService.getPatients(search);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await patientService.updatePatient(req.params.id, req.body);
    res.json(updatedPatient);
  } catch (error) {
    if (error.message === 'Patient not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = { createPatient, getPatients, getPatientById, updatePatient };
