import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Patients</h3>
          </div>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Appointments Today</h3>
          </div>
          <div className="text-2xl font-bold">+12</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Prescriptions</h3>
          </div>
          <div className="text-2xl font-bold">573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Lab Results Pending</h3>
          </div>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">-4 since last hour</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0">
            <h3 className="font-semibold leading-none tracking-tight">Recent Appointments</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-8">
              {/* Placeholder for recent appointments list */}
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Olivia Martin</p>
                  <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                </div>
                <div className="ml-auto font-medium">9:00 AM</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Jackson Lee</p>
                  <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                </div>
                <div className="ml-auto font-medium">10:30 AM</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0">
            <h3 className="font-semibold leading-none tracking-tight">Quick Actions</h3>
          </div>
          <div className="p-6 pt-0 flex flex-col gap-4">
            <Link to="/patients">
              <Button variant="outline" className="w-full justify-start">Register New Patient</Button>
            </Link>
            <Link to="/appointments">
              <Button variant="outline" className="w-full justify-start">Schedule Appointment</Button>
            </Link>
            <Button variant="outline" className="w-full justify-start">Create Prescription</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
