const Minio = require('minio');

let minioClient;

const connectMinIO = () => {
  try {
    minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });

    console.log('MinIO Client Initialized');
    
    // Ensure bucket exists
    const bucketName = process.env.MINIO_BUCKET || 'ehr-documents';
    minioClient.bucketExists(bucketName, (err, exists) => {
      if (err) {
        return console.log('MinIO Bucket Check Error:', err);
      }
      if (!exists) {
        minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
          if (err) return console.log('Error creating bucket.', err);
          console.log(`Bucket "${bucketName}" created successfully.`);
        });
      }
    });

  } catch (error) {
    console.error('MinIO Connection Error:', error);
  }
};

const getMinioClient = () => minioClient;

module.exports = { connectMinIO, getMinioClient };
