import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Home } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Submission Successful!</CardTitle>
          <CardDescription>
            Your employee information has been submitted successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm">
              Your submission is now being reviewed by the admin team. 
              You will be notified once the verification is complete.
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Thank you for completing the employee master data form.
            </p>
            <Link href="/">
              <Button className="w-full" size="lg">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
