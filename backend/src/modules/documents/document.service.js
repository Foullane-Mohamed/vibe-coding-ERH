const Document = require('./document.model');
const { getMinioClient } = require('../../config/minio');
const crypto = require('crypto');
const path = require('path');

const uploadDocument = async (file, documentData, userId) => {
  if (!file) {
    throw new Error('No file uploaded');
  }

  const { patientId, tags, description } = documentData;

  // Validate file size (20MB)
  if (file.size > 20 * 1024 * 1024) {
    throw new Error('File too large (max 20MB)');
  }

  // Validate MIME type
  const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedMimes.includes(file.mimetype)) {
    throw new Error('Invalid file type');
  }

  const minioClient = getMinioClient();
  const bucketName = process.env.MINIO_BUCKET || 'ehr-documents';
  const objectName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${path.extname(file.originalname)}`;

  // Upload to MinIO
  await minioClient.putObject(bucketName, objectName, file.buffer, file.size, {
    'Content-Type': file.mimetype,
  });

  // Save metadata to MongoDB
  return await Document.create({
    patient: patientId,
    uploader: userId,
    filename: objectName,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    minioKey: objectName,
    tags: tags ? JSON.parse(tags) : [],
    description,
  });
};

const getPatientDocuments = async (patientId) => {
  return await Document.find({ patient: patientId })
    .populate('uploader', 'firstName lastName')
    .sort({ createdAt: -1 });
};

const getDocumentUrl = async (id) => {
  const document = await Document.findById(id);
  if (!document) {
    throw new Error('Document not found');
  }

  const minioClient = getMinioClient();
  const bucketName = process.env.MINIO_BUCKET || 'ehr-documents';
  
  // Generate presigned URL (valid for 10 minutes)
  return await minioClient.presignedGetObject(bucketName, document.minioKey, 10 * 60);
};

module.exports = { uploadDocument, getPatientDocuments, getDocumentUrl };
