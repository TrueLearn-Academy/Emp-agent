"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bankDetailsSchema, type BankDetailsType } from '@/lib/validators'
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

export default function BankDetailsForm({ employeeId, data, onNext, onUpdate }: Props) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BankDetailsType>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      bankAccountName: data?.bankAccountName as string || '',
      bankName: data?.bankName as string || '',
      branchName: data?.branchName as string || '',
      accountNumber: data?.accountNumber as string || '',
      ifsc: data?.ifsc as string || '',
    },
  })

  const onSubmit = async (formData: BankDetailsType) => {
    const result = await saveEmployeeData(employeeId, formData, 'bank details')
    
    if (result.success) {
      onUpdate(formData)
      toast({
        title: 'Saved',
        description: 'Bank details saved successfully',
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
          <Label htmlFor="bankAccountName">Account Holder Name *</Label>
          <Input id="bankAccountName" {...register('bankAccountName')} />
          {errors.bankAccountName && (
            <p className="text-sm text-red-600">{errors.bankAccountName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name *</Label>
          <Input id="bankName" {...register('bankName')} />
          {errors.bankName && (
            <p className="text-sm text-red-600">{errors.bankName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="branchName">Branch Name *</Label>
          <Input id="branchName" {...register('branchName')} />
          {errors.branchName && (
            <p className="text-sm text-red-600">{errors.branchName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number *</Label>
          <Input id="accountNumber" {...register('accountNumber')} />
          {errors.accountNumber && (
            <p className="text-sm text-red-600">{errors.accountNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ifsc">IFSC Code *</Label>
          <Input id="ifsc" {...register('ifsc')} placeholder="ABCD0123456" maxLength={11} className="uppercase" />
          {errors.ifsc && (
            <p className="text-sm text-red-600">{errors.ifsc.message}</p>
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
