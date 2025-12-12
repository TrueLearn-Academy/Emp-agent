import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Shield } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Company Logo" width={180} height={180} className="object-contain" priority />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
            Employee Master Data System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamlined employee information collection and management platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Employee Portal</CardTitle>
              <CardDescription>
                Submit your master data information securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>✓ Multi-step form wizard</li>
                <li>✓ Auto-save your progress</li>
                <li>✓ Upload required documents</li>
                <li>✓ Mobile-friendly interface</li>
              </ul>
              <Link href="/employee/new">
                <Button className="w-full" size="lg">
                  Start New Submission
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
                Manage and verify employee submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>✓ Review all submissions</li>
                <li>✓ Verify documents</li>
                <li>✓ Export data and files</li>
                <li>✓ Audit trail tracking</li>
              </ul>
              <Link href="/admin/login">
                <Button variant="outline" className="w-full" size="lg">
                  Admin Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <FileText className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Contact your HR department for assistance with the submission process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
