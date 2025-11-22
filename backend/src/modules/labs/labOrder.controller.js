const labOrderService = require('./labOrder.service');

// @desc    Create lab order
// @route   POST /api/lab-orders
// @access  Private (Doctor)
const createLabOrder = async (req, res) => {
  try {
    const labOrder = await labOrderService.createLabOrder(req.body, req.user._id);
    res.status(201).json(labOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get lab orders
// @route   GET /api/lab-orders
// @access  Private
const getLabOrders = async (req, res) => {
  try {
    const labOrders = await labOrderService.getLabOrders(req.user);
    res.json(labOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lab order status/results
// @route   PUT /api/lab-orders/:id
// @access  Private (Lab Technician, Admin)
const updateLabOrder = async (req, res) => {
  try {
    const updatedLabOrder = await labOrderService.updateLabOrder(req.params.id, req.body);
    res.json(updatedLabOrder);
  } catch (error) {
    if (error.message === 'Lab order not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { createLabOrder, getLabOrders, updateLabOrder };
