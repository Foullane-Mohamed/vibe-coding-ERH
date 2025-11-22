import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Patient {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/patients?search=${search}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPatients(response.data)
      } catch (error) {
        console.error('Error fetching patients:', error)
      }
    }

    const debounce = setTimeout(() => {
      fetchPatients()
    }, 500)

    return () => clearTimeout(debounce)
  }, [search])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
        <Link to="/patients/new">
          <Button>Add Patient</Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Input 
          placeholder="Search patients..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {patients.map((patient) => (
                <tr key={patient._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle font-medium">{patient.firstName} {patient.lastName}</td>
                  <td className="p-4 align-middle">{patient.email}</td>
                  <td className="p-4 align-middle">{patient.phone}</td>
                  <td className="p-4 align-middle">
                    <Link to={`/patients/${patient._id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Patients
