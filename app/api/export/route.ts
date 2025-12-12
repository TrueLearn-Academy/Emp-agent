import { NextResponse } from 'next/server'
import { getAdminSession } from '@/app/actions/admin'
import { prisma } from '@/lib/prisma'
import ExcelJS from 'exceljs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check admin authentication
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all employees with their documents
    const employees = await prisma.employee.findMany({
      include: {
        documents: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Create workbook
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Employees')

    // Define columns
    worksheet.columns = [
      { header: 'Employee ID', key: 'employeeId', width: 15 },
      { header: 'Full Name', key: 'fullName', width: 25 },
      { header: 'Father Name', key: 'fatherName', width: 25 },
      { header: 'Mother Name', key: 'motherName', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'WhatsApp', key: 'whatsapp', width: 15 },
      { header: 'Date of Birth', key: 'dob', width: 15 },
      { header: 'Date of Joining', key: 'dateOfJoining', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Blood Group', key: 'bloodGroup', width: 12 },
      { header: 'Permanent Address', key: 'permanentAddress', width: 40 },
      { header: 'Present Address', key: 'presentAddress', width: 40 },
      { header: 'State', key: 'state', width: 20 },
      { header: 'District', key: 'district', width: 20 },
      { header: 'Pincode', key: 'pincode', width: 10 },
      { header: 'Aadhaar', key: 'aadhaar', width: 15 },
      { header: 'PAN', key: 'pan', width: 12 },
      { header: 'Highest Qualification', key: 'highestQualification', width: 25 },
      { header: 'Institution', key: 'institution', width: 30 },
      { header: 'Year of Passing', key: 'yearOfPassing', width: 15 },
      { header: 'Percentage/CGPA', key: 'percentage', width: 15 },
      { header: 'Bank Account Name', key: 'bankAccountName', width: 25 },
      { header: 'Bank Name', key: 'bankName', width: 25 },
      { header: 'Branch Name', key: 'branchName', width: 25 },
      { header: 'Account Number', key: 'accountNumber', width: 20 },
      { header: 'IFSC Code', key: 'ifsc', width: 15 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ]

    // Style header row
    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' },
    }
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }

    // Add data
    employees.forEach((employee) => {
      worksheet.addRow({
        employeeId: employee.employeeId,
        fullName: employee.fullName || '',
        fatherName: employee.fatherName || '',
        motherName: employee.motherName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        whatsapp: employee.whatsapp || '',
        dob: employee.dob ? new Date(employee.dob).toLocaleDateString() : '',
        dateOfJoining: employee.dateOfJoining ? new Date(employee.dateOfJoining).toLocaleDateString() : '',
        gender: employee.gender || '',
        bloodGroup: employee.bloodGroup || '',
        permanentAddress: employee.permanentAddress || '',
        presentAddress: employee.presentAddress || '',
        state: employee.state || '',
        district: employee.district || '',
        pincode: employee.pincode || '',
        aadhaar: employee.aadhaar || '',
        pan: employee.pan || '',
        highestQualification: employee.highestQualification || '',
        institution: employee.institution || '',
        yearOfPassing: employee.yearOfPassing || '',
        percentage: employee.percentage || '',
        bankName: employee.bankName || '',
        accountNumber: employee.accountNumber || '',
        ifsc: employee.ifsc || '',
        branchName: employee.branchName || '',
        bankAccountName: employee.bankAccountName || '',
        status: employee.status,
        createdAt: new Date(employee.createdAt).toLocaleString(),
      })
    })

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()

    // Return file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=employees-${new Date().toISOString().split('T')[0]}.xlsx`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
