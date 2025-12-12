import { redirect } from 'next/navigation'
import { createDraftEmployee } from '@/app/actions/employee'

export const dynamic = 'force-dynamic'

export default async function NewEmployeePage() {
  const result = await createDraftEmployee()
  
  if (result.success && result.employeeId) {
    redirect(`/employee/${result.employeeId}/steps`)
  }
  
  // This should never be reached if redirect succeeds
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl">⚠️</div>
        <h1 className="text-2xl font-bold">Unable to Create Submission</h1>
        <p className="text-muted-foreground">
          {result.error || 'An unexpected error occurred. Please try again.'}
        </p>
        <a href="/" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Go Back Home
        </a>
      </div>
    </div>
  )
}
