import { getEmployeeData } from '@/app/actions/employee'
import { redirect } from 'next/navigation'
import MultiStepForm from '@/components/forms/MultiStepForm'

export const dynamic = 'force-dynamic'

export default async function EmployeeStepsPage({
  params,
}: {
  params: { id: string }
}) {
  const result = await getEmployeeData(params.id)

  if (!result.success || !result.data) {
    redirect('/employee/new')
  }

  return <MultiStepForm employeeId={params.id} initialData={result.data} />
}
