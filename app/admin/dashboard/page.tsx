import { redirect } from 'next/navigation'
import { getAdminSession } from '@/app/actions/admin'
import { getEmployeeStats } from '@/app/actions/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import ExportButton from '@/components/admin/ExportButton'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const session = await getAdminSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const statsResult = await getEmployeeStats()
  const stats = statsResult.success ? statsResult.data : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="border-b bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Company Logo" width={60} height={60} className="object-contain" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session.email}</span>
            <Link href="/admin/employees">
              <Button>View Employees</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Employees
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.total || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Submissions
              </CardTitle>
              <Clock className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.submitted || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verified
              </CardTitle>
              <UserCheck className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.verified || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rejected
              </CardTitle>
              <XCircle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.rejected || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <Link href="/admin/employees">
              <Button variant="outline" className="w-full">
                View All Employees
              </Button>
            </Link>
            <Link href="/admin/employees?status=SUBMITTED">
              <Button variant="outline" className="w-full">
                Review Pending
              </Button>
            </Link>
            <ExportButton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
