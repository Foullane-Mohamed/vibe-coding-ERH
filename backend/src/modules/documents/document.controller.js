const documentService = require('./document.service');

// @desc    Upload document
// @route   POST /api/documents
// @access  Private
const uploadDocument = async (req, res) => {
  try {
    const document = await documentService.uploadDocument(req.file, req.body, req.user._id);
    res.status(201).json(document);
  } catch (error) {
    if (error.message === 'No file uploaded' || error.message === 'File too large (max 20MB)' || error.message === 'Invalid file type') {
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Get documents for patient
// @route   GET /api/documents/patient/:patientId
// @access  Private
const getPatientDocuments = async (req, res) => {
  try {
    const documents = await documentService.getPatientDocuments(req.params.patientId);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get download URL
// @route   GET /api/documents/:id/download
// @access  Private
const getDocumentUrl = async (req, res) => {
  try {
    const url = await documentService.getDocumentUrl(req.params.id);
    res.json({ url });
  } catch (error) {
    if (error.message === 'Document not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { uploadDocument, getPatientDocuments, getDocumentUrl };
