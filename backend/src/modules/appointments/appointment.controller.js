const appointmentService = require('./appointment.service');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    if (error.message === 'Doctor is not available at this time') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointments(req.user, req.query);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Doctor, Admin, Secretary)
const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await appointmentService.updateAppointment(req.params.id, req.body);
    res.json(updatedAppointment);
  } catch (error) {
    if (error.message === 'Appointment not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { createAppointment, getAppointments, updateAppointment };
