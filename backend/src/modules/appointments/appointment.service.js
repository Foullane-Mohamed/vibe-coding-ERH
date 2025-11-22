const Appointment = require('./appointment.model');
const User = require('../users/user.model');

const createAppointment = async (appointmentData) => {
  const { patient, doctor, startTime, duration, reason } = appointmentData;

  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60000); // duration in minutes

  // Check if doctor exists and is a doctor
  const doctorUser = await User.findById(doctor);
  if (!doctorUser || doctorUser.role !== 'doctor') {
    throw new Error('Invalid doctor');
  }

  // Conflict Detection
  const conflict = await Appointment.findOne({
    doctor,
    status: { $ne: 'cancelled' },
    $or: [
      { startTime: { $lt: end }, endTime: { $gt: start } },
    ],
  });

  if (conflict) {
    throw new Error('Doctor is not available at this time');
  }

  return await Appointment.create({
    patient,
    doctor,
    startTime: start,
    endTime: end,
    reason,
  });
};

const getAppointments = async (user, queryParams) => {
  const { doctor, date } = queryParams;
  let query = {};

  if (user.role === 'patient') {
    query.patient = user._id;
  } else if (user.role === 'doctor') {
    query.doctor = user._id;
  } else if (doctor) {
    query.doctor = doctor;
  }

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    query.startTime = { $gte: startOfDay, $lte: endOfDay };
  }

  return await Appointment.find(query)
    .populate('patient', 'firstName lastName')
    .populate('doctor', 'firstName lastName')
    .sort({ startTime: 1 });
};

const updateAppointment = async (id, updateData) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    throw new Error('Appointment not found');
  }

  appointment.status = updateData.status || appointment.status;
  appointment.notes = updateData.notes || appointment.notes;
  
  return await appointment.save();
};

module.exports = { createAppointment, getAppointments, updateAppointment };
