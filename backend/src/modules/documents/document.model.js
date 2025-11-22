const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  minioKey: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  description: String,
}, {
  timestamps: true,
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
