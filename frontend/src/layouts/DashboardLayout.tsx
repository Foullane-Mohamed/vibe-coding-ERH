import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">EHR System</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Dashboard</a>
            </li>
            <li>
              <a href="/patients" className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Patients</a>
            </li>
            <li>
              <a href="/appointments" className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Appointments</a>
            </li>
            <li>
              <a href="/consultations" className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Consultations</a>
            </li>
            <li>
              <a href="/prescriptions" className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Pharmacy</a>
            </li>
            <li>
              <a href="/lab-orders" className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Labs</a>
            </li>
            <li>
              <a href="/documents" className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Documents</a>
            </li>
            <li className="pt-4 border-t">
              <a href="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700 font-semibold">User Management</a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <div className="ml-auto">User Profile</div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
