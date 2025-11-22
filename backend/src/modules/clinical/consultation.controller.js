const consultationService = require('./consultation.service');

// @desc    Create consultation record
// @route   POST /api/consultations
// @access  Private (Doctor)
const createConsultation = async (req, res) => {
  try {
    const consultation = await consultationService.createConsultation(req.body, req.user._id);
    res.status(201).json(consultation);
  } catch (error) {
    if (error.message === 'Appointment not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Not authorized to create consultation for this appointment') {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Get consultation by ID
// @route   GET /api/consultations/:id
// @access  Private
const getConsultationById = async (req, res) => {
  try {
    const consultation = await consultationService.getConsultationById(req.params.id);
    if (consultation) {
      res.json(consultation);
    } else {
      res.status(404).json({ message: 'Consultation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get consultations for a patient
// @route   GET /api/consultations/patient/:patientId
// @access  Private
const getPatientConsultations = async (req, res) => {
  try {
    const consultations = await consultationService.getPatientConsultations(req.params.patientId);
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createConsultation, getConsultationById, getPatientConsultations };
