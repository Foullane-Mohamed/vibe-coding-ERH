import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Patients from './pages/patients/Patients'
import Appointments from './pages/appointments/Appointments'
import NotFound from './pages/NotFound'

import Consultations from './pages/clinical/Consultations'
import Prescriptions from './pages/pharmacy/Prescriptions'
import LabOrders from './pages/labs/LabOrders'
import Documents from './pages/documents/Documents'
import CreatePatient from './pages/patients/CreatePatient'
import CreateAppointment from './pages/appointments/CreateAppointment'
import CreateConsultation from './pages/clinical/CreateConsultation'
import CreatePrescription from './pages/pharmacy/CreatePrescription'
import CreateLabOrder from './pages/labs/CreateLabOrder'
import UploadDocument from './pages/documents/UploadDocument'
import Users from './pages/admin/Users'
import CreateUser from './pages/admin/CreateUser'

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/new" element={<CreatePatient />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/new" element={<CreateAppointment />} />
        <Route path="/consultations" element={<Consultations />} />
        <Route path="/consultations/new" element={<CreateConsultation />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/prescriptions/new" element={<CreatePrescription />} />
        <Route path="/lab-orders" element={<LabOrders />} />
        <Route path="/lab-orders/new" element={<CreateLabOrder />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/new" element={<UploadDocument />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/new" element={<CreateUser />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
