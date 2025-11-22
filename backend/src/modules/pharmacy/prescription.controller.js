const prescriptionService = require('./prescription.service');

// @desc    Create prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor)
const createPrescription = async (req, res) => {
  try {
    const prescription = await prescriptionService.createPrescription(req.body, req.user._id);
    res.status(201).json(prescription);
  } catch (error) {
    if (error.message === 'Consultation not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Get prescriptions
// @route   GET /api/prescriptions
// @access  Private
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescriptionService.getPrescriptions(req.user);
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update prescription status (e.g. dispense)
// @route   PUT /api/prescriptions/:id/status
// @access  Private (Pharmacist)
const updatePrescriptionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedPrescription = await prescriptionService.updatePrescriptionStatus(req.params.id, status);
    res.json(updatedPrescription);
  } catch (error) {
    if (error.message === 'Prescription not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { createPrescription, getPrescriptions, updatePrescriptionStatus };
