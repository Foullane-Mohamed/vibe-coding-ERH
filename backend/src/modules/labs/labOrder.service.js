const LabOrder = require('./labOrder.model');

const createLabOrder = async (labOrderData, userId) => {
  const { patientId, tests, notes } = labOrderData;

  return await LabOrder.create({
    patient: patientId,
    doctor: userId,
    tests,
    notes,
  });
};

const getLabOrders = async (user) => {
  let query = {};

  if (user.role === 'patient') {
    query.patient = user._id;
  } else if (user.role === 'doctor') {
    query.doctor = user._id;
  }

  return await LabOrder.find(query)
    .populate('patient', 'firstName lastName')
    .populate('doctor', 'firstName lastName')
    .sort({ createdAt: -1 });
};

const updateLabOrder = async (id, updateData) => {
  const labOrder = await LabOrder.findById(id);

  if (!labOrder) {
    throw new Error('Lab order not found');
  }

  labOrder.status = updateData.status || labOrder.status;
  labOrder.results = updateData.results || labOrder.results;
  
  return await labOrder.save();
};

module.exports = { createLabOrder, getLabOrders, updateLabOrder };
