"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { submitEmployeeForm } from '@/app/actions/employee'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface Props {
  employeeId: string
  data: Record<string, unknown>
  onUpdate: (data: Record<string, unknown>) => void
}

export default function ReviewForm({ employeeId, data }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const result = await submitEmployeeForm(employeeId, data)
    
    if (result.success) {
      toast({
        title: 'Success',
        description: 'Your information has been submitted successfully!',
      })
      router.push('/employee/success')
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Submission failed',
        variant: 'destructive',
      })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div><strong>Full Name:</strong> {data.fullName as string}</div>
          <div><strong>Email:</strong> {data.email as string}</div>
          <div><strong>Phone:</strong> {data.phone as string}</div>
          <div><strong>Gender:</strong> {data.gender as string}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div><strong>Permanent:</strong> {data.permanentAddress as string}</div>
          <div><strong>Present:</strong> {data.presentAddress as string}</div>
          <div><strong>State:</strong> {data.state as string}, <strong>District:</strong> {data.district as string}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Government IDs</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div><strong>Aadhaar:</strong> {data.aadhaar as string}</div>
          <div><strong>PAN:</strong> {data.pan as string}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div><strong>Bank:</strong> {data.bankName as string}</div>
          <div><strong>Account:</strong> {data.accountNumber as string}</div>
          <div><strong>IFSC:</strong> {data.ifsc as string}</div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
        <p className="text-sm text-center mb-4">
          Please review all information carefully before submitting. You will not be able to edit after submission.
        </p>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Submit Application
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
