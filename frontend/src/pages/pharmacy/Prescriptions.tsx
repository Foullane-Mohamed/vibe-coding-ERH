import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Prescription {
  _id: string
  patient: { firstName: string; lastName: string }
  doctor: { firstName: string; lastName: string }
  medications: { name: string }[]
  status: string
  createdAt: string
}

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/prescriptions`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPrescriptions(response.data)
      } catch (error) {
        console.error('Error fetching prescriptions:', error)
      }
    }

    fetchPrescriptions()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
        <Link to="/prescriptions/new">
          <Button>New Prescription</Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Patient</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Doctor</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Medications</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {prescriptions.map((rx) => (
                <tr key={rx._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle font-medium">{rx.patient.firstName} {rx.patient.lastName}</td>
                  <td className="p-4 align-middle">{rx.doctor.firstName} {rx.doctor.lastName}</td>
                  <td className="p-4 align-middle">{rx.medications.map(m => m.name).join(', ')}</td>
                  <td className="p-4 align-middle capitalize">{rx.status}</td>
                  <td className="p-4 align-middle">{new Date(rx.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Prescriptions
