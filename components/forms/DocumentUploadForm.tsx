"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Upload, FileCheck, Loader2 } from 'lucide-react'

interface Props {
  employeeId: string
  data: Record<string, unknown>
  onNext: () => void
  onUpdate: (data: Record<string, unknown>) => void
}

const documents = [
  { name: 'aadhaarFile', label: 'Aadhaar Card' },
  { name: 'panFile', label: 'PAN Card' },
  { name: 'passbookFile', label: 'Bank Passbook' },
  { name: 'tenthMarksFile', label: '10th Marksheet' },
  { name: 'twelfthMarksFile', label: '12th Marksheet' },
  { name: 'degreeMarksFile', label: 'Degree Marksheet' },
  { name: 'degreeCertificateFile', label: 'Degree Certificate' },
]

export default function DocumentUploadForm({ employeeId, data, onNext }: Props) {
  const { toast } = useToast()
  const [uploads, setUploads] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast({
        title: 'Error',
        description: 'File size must be less than 5MB',
        variant: 'destructive',
      })
      return
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Error',
        description: 'Only PDF, JPG, and PNG files are allowed',
        variant: 'destructive',
      })
      return
    }

    setLoading(fieldName)

    // Create FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('employeeId', employeeId)
    formData.append('fieldName', fieldName)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploads(prev => ({ ...prev, [fieldName]: file.name }))
        toast({
          title: 'Success',
          description: 'Document uploaded successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Upload failed',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Upload failed',
        variant: 'destructive',
      })
    } finally {
      setLoading(null)
    }
  }

  const handleContinue = () => {
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <div key={doc.name} className="space-y-2">
            <Label htmlFor={doc.name}>{doc.label}</Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <input
                type="file"
                id={doc.name}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, doc.name)}
                className="hidden"
                disabled={loading === doc.name}
              />
              <label
                htmlFor={doc.name}
                className="flex flex-col items-center cursor-pointer"
              >
                {loading === doc.name ? (
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                ) : uploads[doc.name] ? (
                  <FileCheck className="w-8 h-8 text-green-500 mb-2" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                )}
                <span className="text-sm text-center">
                  {uploads[doc.name] || 'Click to upload'}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG (max 5MB)
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleContinue} className="w-full">
        Continue to Review
      </Button>
    </div>
  )
}
