# Electronic Health Record (EHR) System

A comprehensive, full-stack Electronic Health Record system built with Node.js, React, MongoDB, Redis, and MinIO.

## Features

- **Role-Based Access Control**: Admin, Doctor, Nurse, Patient roles.
- **Patient Management**: Create, update, and search patient records.
- **Appointment Scheduling**: Schedule appointments with conflict detection.
- **Clinical Modules**: Consultations, Vitals, Diagnosis.
- **Pharmacy**: E-Prescribing and medication management.
- **Lab Integration**: Order and track lab tests.
- **Document Management**: Securely upload and view medical documents (MinIO).
- **Secure Authentication**: JWT-based auth with refresh tokens.

## Tech Stack

- **Backend**: Node.js, Express, Mongoose, Redis, MinIO, JWT.
- **Frontend**: React, TypeScript, Vite, TailwindCSS, ShadCN UI, React Query, React Hook Form, Zod.
- **DevOps**: Docker Compose, GitHub Actions.

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local dev without Docker)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ehr-system
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```
   This will start:
   - Backend API: http://localhost:5000
   - Frontend App: http://localhost:5173
   - MongoDB: localhost:27017
   - Redis: localhost:6379
   - MinIO Console: http://localhost:9001

3. **Access the Application**
   - Open http://localhost:5173 in your browser.
   - Register a new user (e.g., as an Admin or Doctor).

## API Documentation

Swagger API documentation is available at http://localhost:5000/api-docs.

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
# or for E2E
npm run cypress
```

## Project Structure

- `backend/`: Node.js API
- `frontend/`: React Application
- `docker-compose.yml`: Development orchestration
- `docker-compose.prod.yml`: Production orchestration
