"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import PersonalDetailsForm from '@/components/forms/PersonalDetailsForm'
import AddressDetailsForm from '@/components/forms/AddressDetailsForm'
import GovernmentIdsForm from '@/components/forms/GovernmentIdsForm'
import EducationDetailsForm from '@/components/forms/EducationDetailsForm'
import BankDetailsForm from '@/components/forms/BankDetailsForm'
import DocumentUploadForm from '@/components/forms/DocumentUploadForm'
import ReviewForm from '@/components/forms/ReviewForm'

const steps = [
  { id: 1, name: 'Personal Details', component: PersonalDetailsForm },
  { id: 2, name: 'Address Details', component: AddressDetailsForm },
  { id: 3, name: 'Government IDs', component: GovernmentIdsForm },
  { id: 4, name: 'Education', component: EducationDetailsForm },
  { id: 5, name: 'Bank Details', component: BankDetailsForm },
  { id: 6, name: 'Documents', component: DocumentUploadForm },
  { id: 7, name: 'Review & Submit', component: ReviewForm },
]

interface MultiStepFormProps {
  employeeId: string
  initialData: any
}

export default function MultiStepForm({ employeeId, initialData }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialData || {})
  const router = useRouter()

  const progress = (currentStep / steps.length) * 100
  const CurrentStepComponent = steps[currentStep - 1].component

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const handleDataUpdate = (data: any) => {
    setFormData({ ...formData, ...data })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="Company Logo" width={120} height={120} className="object-contain" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Employee Information Form</h1>
          <p className="text-muted-foreground">Complete all steps to submit your information</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentStep === step.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : currentStep > step.id
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {currentStep > step.id && (
                <CheckCircle2 className="inline w-4 h-4 mr-1" />
              )}
              {step.name}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].name}</CardTitle>
            <CardDescription>
              Please fill in all required fields
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              employeeId={employeeId}
              data={formData}
              onNext={handleNext}
              onUpdate={handleDataUpdate}
            />
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length && (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
