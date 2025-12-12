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
      education_10: data?.education_10 as string || '',
      education_12: data?.education_12 as string || '',
      education_degree: data?.education_degree as string || '',
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
          <Label htmlFor="education_10">10th Standard Details</Label>
          <Input id="education_10" {...register('education_10')} placeholder="School Name, Board, Year, Percentage" />
          {errors.education_10 && (
            <p className="text-sm text-red-600">{errors.education_10.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="education_12">12th Standard Details</Label>
          <Input id="education_12" {...register('education_12')} placeholder="School Name, Board, Year, Percentage" />
          {errors.education_12 && (
            <p className="text-sm text-red-600">{errors.education_12.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="education_degree">Degree Details</Label>
          <Input id="education_degree" {...register('education_degree')} placeholder="College, Degree, Year, Percentage" />
          {errors.education_degree && (
            <p className="text-sm text-red-600">{errors.education_degree.message}</p>
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
