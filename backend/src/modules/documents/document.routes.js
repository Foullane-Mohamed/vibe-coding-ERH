const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadDocument, getPatientDocuments, getDocumentUrl } = require('./document.controller');
const { protect, authorize } = require('../../middleware/authMiddleware');

// Configure Multer (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', protect, upload.single('file'), uploadDocument);
router.get('/patient/:patientId', protect, getPatientDocuments);
router.get('/:id/download', protect, getDocumentUrl);

module.exports = router;
