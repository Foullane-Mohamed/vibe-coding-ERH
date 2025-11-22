import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Consultation {
  _id: string
  patient: { firstName: string; lastName: string }
  doctor: { firstName: string; lastName: string }
  diagnosis: { code: string; description: string }[]
  createdAt: string
}

const Consultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([])

  useEffect(() => {
    // In a real app, we might fetch all or filter by patient/doctor
    // For now, let's assume we have an endpoint or just show empty state
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Consultations</h1>
        <Link to="/consultations/new">
          <Button>New Consultation</Button>
        </Link>
      </div>
      <div className="text-muted-foreground">Select a patient to view their consultations.</div>
    </div>
  )
}

export default Consultations
