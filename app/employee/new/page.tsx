import { redirect } from 'next/navigation'
import { createDraftEmployee } from '@/app/actions/employee'
import { Loader2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function NewEmployeePage() {
  try {
    const result = await createDraftEmployee()
    
    if (result.success && result.employeeId) {
      redirect(`/employee/${result.employeeId}/steps`)
    }
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600" />
          <p className="text-lg font-medium">Creating your submission...</p>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error creating employee:', error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold">Service Unavailable</h1>
          <p className="text-muted-foreground">
            The application is currently being configured. Please try again in a few moments.
          </p>
          <a href="/" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Go Back Home
          </a>
        </div>
      </div>
    )
  }
}
