"use client"

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useState } from 'react'

export default function ExportButton() {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/export')
      
      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `employees-${new Date().toISOString().split('T')[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={handleExport}
      disabled={loading}
    >
      <Download className="w-4 h-4 mr-2" />
      {loading ? 'Exporting...' : 'Export Data'}
    </Button>
  )
}
