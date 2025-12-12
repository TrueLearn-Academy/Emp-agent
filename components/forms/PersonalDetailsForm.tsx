"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalDetailsSchema, type PersonalDetailsType } from '@/lib/validators'
import { saveEmployeeData } from '@/app/actions/employee'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface Props {
  employeeId: string
  data: any
  onNext: () => void
  onUpdate: (data: any) => void
}

export default function PersonalDetailsForm({ employeeId, data, onNext, onUpdate }: Props) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PersonalDetailsType>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      fullName: data?.fullName || '',
      fatherName: data?.fatherName || '',
      motherName: data?.motherName || '',
      phone: data?.phone || '',
      whatsapp: data?.whatsapp || '',
      email: data?.email || '',
      dob: data?.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
      gender: data?.gender || 'Male',
      bloodGroup: data?.bloodGroup || '',
    },
  })

  const gender = watch('gender')

  const onSubmit = async (formData: PersonalDetailsType) => {
    const result = await saveEmployeeData(employeeId, formData, 'personal details')
    
    if (result.success) {
      onUpdate(formData)
      toast({
        title: 'Saved',
        description: 'Personal details saved successfully',
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
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" {...register('fullName')} />
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fatherName">Father's Name *</Label>
          <Input id="fatherName" {...register('fatherName')} />
          {errors.fatherName && (
            <p className="text-sm text-red-600">{errors.fatherName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="motherName">Mother's Name *</Label>
          <Input id="motherName" {...register('motherName')} />
          {errors.motherName && (
            <p className="text-sm text-red-600">{errors.motherName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" {...register('phone')} placeholder="10-digit mobile number" />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input id="whatsapp" {...register('whatsapp')} placeholder="Optional" />
          {errors.whatsapp && (
            <p className="text-sm text-red-600">{errors.whatsapp.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input id="dob" type="date" {...register('dob')} />
          {errors.dob && (
            <p className="text-sm text-red-600">{errors.dob.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfJoining">Date of Joining *</Label>
          <Input id="dateOfJoining" type="date" {...register('dateOfJoining')} />
          {errors.dateOfJoining && (
            <p className="text-sm text-red-600">{errors.dateOfJoining.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={gender} onValueChange={(value) => setValue('gender', value as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Input id="bloodGroup" {...register('bloodGroup')} placeholder="Optional" />
          {errors.bloodGroup && (
            <p className="text-sm text-red-600">{errors.bloodGroup.message}</p>
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
