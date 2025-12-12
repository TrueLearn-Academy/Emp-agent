import { redirect } from 'next/navigation'
import { getAdminSession, getAllEmployees } from '@/app/actions/admin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminEmployeesPage() {
  const session = await getAdminSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const result = await getAllEmployees()
  const employees = result.success ? result.data : []

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
            <h1 className="text-2xl font-bold">Employee List</h1>
          </div>
          <Link href="/admin/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees?.map((employee: any) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-mono text-sm">
                    {employee.employeeId}
                  </TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(employee.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/employees/${employee.id}`}>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
