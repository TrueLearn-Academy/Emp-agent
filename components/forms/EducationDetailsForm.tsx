"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { educationDetailsSchema, type EducationDetailsType } from '@/lib/validators'
import { saveEmployeeData } from '@/app/actions/employee'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface Props {
  employeeId: string
  data: Record<string, unknown>
  onNext: () => void
  onUpdate: (data: Record<string, unknown>) => void
}

export default function EducationDetailsForm({ employeeId, data, onNext, onUpdate }: Props) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EducationDetailsType>({
    resolver: zodResolver(educationDetailsSchema),
    defaultValues: {
      highestQualification: data?.highestQualification as string || '',
      institution: data?.institution as string || '',
      yearOfPassing: data?.yearOfPassing as string || '',
      percentage: data?.percentage as string || '',
    },
  })

  const onSubmit = async (formData: EducationDetailsType) => {
    const result = await saveEmployeeData(employeeId, formData, 'education details')
    
    if (result.success) {
      onUpdate(formData)
      toast({
        title: 'Saved',
        description: 'Education details saved successfully',
      })
      onNext()
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to save',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="highestQualification">Highest Qualification</Label>
          <Input id="highestQualification" {...register('highestQualification')} placeholder="e.g., B.Tech, MBA, M.Sc, etc." />
          {errors.highestQualification && (
            <p className="text-sm text-red-600">{errors.highestQualification.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution">Institution Name</Label>
          <Input id="institution" {...register('institution')} placeholder="Name of university/college/school" />
          {errors.institution && (
            <p className="text-sm text-red-600">{errors.institution.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearOfPassing">Year of Passing</Label>
          <Input id="yearOfPassing" {...register('yearOfPassing')} placeholder="e.g., 2020" />
          {errors.yearOfPassing && (
            <p className="text-sm text-red-600">{errors.yearOfPassing.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="percentage">Percentage/CGPA</Label>
          <Input id="percentage" {...register('percentage')} placeholder="e.g., 85% or 8.5 CGPA" />
          {errors.percentage && (
            <p className="text-sm text-red-600">{errors.percentage.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save & Continue
      </Button>
    </form>
  )
}
