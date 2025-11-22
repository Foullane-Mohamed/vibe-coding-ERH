import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Documents = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <Link to="/documents/new">
          <Button>Upload Document</Button>
        </Link>
      </div>
      <div className="text-muted-foreground">Select a patient to view their documents.</div>
    </div>
  )
}

export default Documents
