import { redirect } from 'next/navigation'
import { createDraftEmployee } from '@/app/actions/employee'

export default async function NewEmployeePage() {
  const result = await createDraftEmployee()
  
  if (result.success && result.employeeId) {
    redirect(`/employee/${result.employeeId}/steps`)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Creating your submission...</p>
    </div>
  )
}
