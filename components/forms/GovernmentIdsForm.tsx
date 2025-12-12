"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { governmentIdsSchema, type GovernmentIdsType } from '@/lib/validators'
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

export default function GovernmentIdsForm({ employeeId, data, onNext, onUpdate }: Props) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GovernmentIdsType>({
    resolver: zodResolver(governmentIdsSchema),
    defaultValues: {
      aadhaar: data?.aadhaar as string || '',
      pan: data?.pan as string || '',
      uan: data?.uan as string || '',
      esic: data?.esic as string || '',
    },
  })

  const onSubmit = async (formData: GovernmentIdsType) => {
    const result = await saveEmployeeData(employeeId, formData, 'government IDs')
    
    if (result.success) {
      onUpdate(formData)
      toast({
        title: 'Saved',
        description: 'Government IDs saved successfully',
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
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="aadhaar">Aadhaar Number *</Label>
          <Input id="aadhaar" {...register('aadhaar')} placeholder="12 digits" maxLength={12} />
          {errors.aadhaar && (
            <p className="text-sm text-red-600">{errors.aadhaar.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pan">PAN Number *</Label>
          <Input id="pan" {...register('pan')} placeholder="ABCDE1234F" maxLength={10} className="uppercase" />
          {errors.pan && (
            <p className="text-sm text-red-600">{errors.pan.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="uan">UAN Number</Label>
          <Input id="uan" {...register('uan')} placeholder="Optional" />
          {errors.uan && (
            <p className="text-sm text-red-600">{errors.uan.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="esic">ESIC Number</Label>
          <Input id="esic" {...register('esic')} placeholder="Optional" />
          {errors.esic && (
            <p className="text-sm text-red-600">{errors.esic.message}</p>
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
