"use client"

import { useState } from 'react'
import { updateEmployeeStatus } from '@/app/actions/admin'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  employeeId: string
  adminId: string
  currentStatus: string
}

export default function EmployeeActions({ employeeId, adminId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleStatusUpdate = async (status: 'VERIFIED' | 'REJECTED') => {
    setLoading(true)
    const result = await updateEmployeeStatus(employeeId, status, adminId)
    
    if (result.success) {
      toast({
        title: 'Success',
        description: `Employee ${status.toLowerCase()} successfully`,
      })
      router.refresh()
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to update status',
        variant: 'destructive',
      })
    }
    setLoading(false)
  }

  if (currentStatus === 'VERIFIED' || currentStatus === 'REJECTED') {
    return null
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleStatusUpdate('VERIFIED')}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Verify
          </>
        )}
      </Button>
      <Button
        onClick={() => handleStatusUpdate('REJECTED')}
        disabled={loading}
        variant="destructive"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </>
        )}
      </Button>
    </div>
  )
}
