const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'nurse', 'secretary', 'patient', 'pharmacist', 'lab_technician'],
    default: 'patient',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  profileImage: {
    type: String, // URL from MinIO
  },
  specialization: {
    type: String, // For doctors
  },
  licenseNumber: {
    type: String, // For medical staff
  },
  phoneNumber: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
}, {
  timestamps: true,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
