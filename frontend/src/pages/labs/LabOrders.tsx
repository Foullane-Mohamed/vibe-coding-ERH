import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface LabOrder {
  _id: string
  patient: { firstName: string; lastName: string }
  doctor: { firstName: string; lastName: string }
  tests: { name: string }[]
  status: string
  createdAt: string
}

const LabOrders = () => {
  const [labOrders, setLabOrders] = useState<LabOrder[]>([])

  useEffect(() => {
    const fetchLabOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/lab-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setLabOrders(response.data)
      } catch (error) {
        console.error('Error fetching lab orders:', error)
      }
    }

    fetchLabOrders()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Lab Orders</h1>
        <Link to="/lab-orders/new">
          <Button>New Lab Order</Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Patient</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Doctor</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tests</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {labOrders.map((order) => (
                <tr key={order._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle font-medium">{order.patient.firstName} {order.patient.lastName}</td>
                  <td className="p-4 align-middle">{order.doctor.firstName} {order.doctor.lastName}</td>
                  <td className="p-4 align-middle">{order.tests.map(t => t.name).join(', ')}</td>
                  <td className="p-4 align-middle capitalize">{order.status}</td>
                  <td className="p-4 align-middle">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LabOrders
