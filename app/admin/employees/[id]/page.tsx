import { redirect } from 'next/navigation'
import { getAdminSession } from '@/app/actions/admin'
import { getEmployeeData } from '@/app/actions/employee'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import EmployeeActions from '@/components/admin/EmployeeActions'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function EmployeeDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getAdminSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const result = await getEmployeeData(params.id)
  
  if (!result.success || !result.data) {
    redirect('/admin/employees')
  }

  const employee = result.data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-green-100 text-green-800'
      case 'SUBMITTED':
        return 'bg-yellow-100 text-yellow-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="border-b bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Company Logo" width={60} height={60} className="object-contain" />
            <div>
              <h1 className="text-2xl font-bold">Employee Details</h1>
              <p className="text-sm text-muted-foreground">ID: {employee.employeeId}</p>
            </div>
          </div>
          <Link href="/admin/employees">
            <Button variant="outline">Back to List</Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Badge className={getStatusColor(employee.status)}>
            {employee.status}
          </Badge>
          <EmployeeActions employeeId={employee.id} adminId={session.userId} currentStatus={employee.status} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="text-base">{employee.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Father&apos;s Name</p>
              <p className="text-base">{employee.fatherName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mother&apos;s Name</p>
              <p className="text-base">{employee.motherName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base">{employee.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-base">{employee.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="text-base">{employee.gender}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Permanent Address</p>
              <p className="text-base">{employee.permanentAddress}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Present Address</p>
              <p className="text-base">{employee.presentAddress}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">State</p>
                <p className="text-base">{employee.state}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">District</p>
                <p className="text-base">{employee.district}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pincode</p>
                <p className="text-base">{employee.pincode}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Government IDs</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Aadhaar Number</p>
              <p className="text-base font-mono">{employee.aadhaar}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">PAN Number</p>
              <p className="text-base font-mono">{employee.pan}</p>
            </div>
            {employee.uan && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">UAN</p>
                <p className="text-base font-mono">{employee.uan}</p>
              </div>
            )}
            {employee.esic && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">ESIC</p>
                <p className="text-base font-mono">{employee.esic}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Name</p>
              <p className="text-base">{employee.bankAccountName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
              <p className="text-base">{employee.bankName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Branch</p>
              <p className="text-base">{employee.branchName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Number</p>
              <p className="text-base font-mono">{employee.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
              <p className="text-base font-mono">{employee.ifsc}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
