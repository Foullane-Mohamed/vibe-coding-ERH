require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const { connectMinIO } = require('./config/minio');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to Services
connectDB();
connectRedis();
connectMinIO();

// Import Routes
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const patientRoutes = require('./modules/patients/patient.routes');
const appointmentRoutes = require('./modules/appointments/appointment.routes');
const consultationRoutes = require('./modules/clinical/consultation.routes');
const prescriptionRoutes = require('./modules/pharmacy/prescription.routes');
const labOrderRoutes = require('./modules/labs/labOrder.routes');
const documentRoutes = require('./modules/documents/document.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/lab-orders', labOrderRoutes);
app.use('/api/documents', documentRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (req, res) => {
  res.send('EHR API is running');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
