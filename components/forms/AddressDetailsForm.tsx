"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressDetailsSchema, type AddressDetailsType } from '@/lib/validators'
import { saveEmployeeData } from '@/app/actions/employee'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface Props {
  employeeId: string
  data: any
  onNext: () => void
  onUpdate: (data: any) => void
}

export default function AddressDetailsForm({ employeeId, data, onNext, onUpdate }: Props) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressDetailsType>({
    resolver: zodResolver(addressDetailsSchema),
    defaultValues: {
      permanentAddress: data?.permanentAddress || '',
      presentAddress: data?.presentAddress || '',
      state: data?.state || '',
      district: data?.district || '',
      pincode: data?.pincode || '',
    },
  })

  const onSubmit = async (formData: AddressDetailsType) => {
    const result = await saveEmployeeData(employeeId, formData, 'address details')
    
    if (result.success) {
      onUpdate(formData)
      toast({
        title: 'Saved',
        description: 'Address details saved successfully',
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
          <Label htmlFor="permanentAddress">Permanent Address *</Label>
          <Input id="permanentAddress" {...register('permanentAddress')} />
          {errors.permanentAddress && (
            <p className="text-sm text-red-600">{errors.permanentAddress.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="presentAddress">Present Address *</Label>
          <Input id="presentAddress" {...register('presentAddress')} />
          {errors.presentAddress && (
            <p className="text-sm text-red-600">{errors.presentAddress.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input id="state" {...register('state')} />
            {errors.state && (
              <p className="text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">District *</Label>
            <Input id="district" {...register('district')} />
            {errors.district && (
              <p className="text-sm text-red-600">{errors.district.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input id="pincode" {...register('pincode')} placeholder="6 digits" />
            {errors.pincode && (
              <p className="text-sm text-red-600">{errors.pincode.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save & Continue
      </Button>
    </form>
  )
}
