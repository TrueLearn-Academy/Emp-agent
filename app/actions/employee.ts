'use server'

import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/supabase'
import { generateEmployeeId } from '@/lib/utils'
import { completeEmployeeSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'

export async function createDraftEmployee() {
  try {
    console.log('🚀 Creating draft employee...')
    console.log('📊 Environment check:', {
      hasDbUrl: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV,
      platform: process.env.RAILWAY_ENVIRONMENT ? 'Railway' : (process.env.VERCEL ? 'Vercel' : 'Local'),
      dbUrlStart: process.env.DATABASE_URL?.substring(0, 30)
    })
    
    const employeeId = generateEmployeeId()
    console.log('🆔 Generated employee ID:', employeeId)
    
    console.log('💾 Attempting database connection...')
    const employee = await prisma.employee.create({
      data: {
        employeeId,
        fullName: '',
        fatherName: '',
        motherName: '',
        phone: '',
        email: '',
        dob: new Date(),
        gender: 'Male',
        permanentAddress: '',
        presentAddress: '',
        state: '',
        district: '',
        pincode: '',
        aadhaar: '',
        pan: '',
        bankAccountName: '',
        bankName: '',
        branchName: '',
        accountNumber: '',
        ifsc: '',
        status: 'DRAFT',
      },
    })
    console.log('✅ Employee created:', employee.id)

    await prisma.employeeDocuments.create({
      data: {
        employeeId: employee.id,
      },
    })
    console.log('✅ Documents record created')

    return { success: true, employeeId: employee.id }
  } catch (error) {
    console.error('❌ Error creating draft:', error)
    
    // Provide more detailed error message
    let errorMessage = 'Failed to create draft'
    if (error instanceof Error) {
      errorMessage = error.message
      
      // Add helpful context for common errors
      if (errorMessage.includes("Can't reach database server")) {
        errorMessage = `Database connection failed. Please check: 1) DATABASE_URL is set in Railway variables, 2) Database server is running, 3) Firewall allows connections. Original error: ${errorMessage}`
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

export async function saveEmployeeData(id: string, data: any, step: string) {
  try {
    // Convert date strings to Date objects
    const processedData = { ...data }
    if (processedData.dob && typeof processedData.dob === 'string') {
      processedData.dob = new Date(processedData.dob)
    }
    if (processedData.dateOfJoining && typeof processedData.dateOfJoining === 'string') {
      processedData.dateOfJoining = new Date(processedData.dateOfJoining)
    }

    await prisma.employee.update({
      where: { id },
      data: {
        ...processedData,
        updatedAt: new Date(),
      },
    })

    return { success: true }
  } catch (error) {
    console.error(`Error saving ${step}:`, error)
    return { success: false, error: `Failed to save ${step}` }
  }
}

export async function submitEmployeeForm(id: string, data: any) {
  try {
    const validated = completeEmployeeSchema.parse(data)
    
    await prisma.employee.update({
      where: { id },
      data: {
        ...validated,
        dob: new Date(validated.dob),
        status: 'SUBMITTED',
        updatedAt: new Date(),
      },
    })

    revalidatePath('/admin/employees')
    return { success: true }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { success: false, error: 'Failed to submit form' }
  }
}

export async function getEmployeeData(id: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    })

    return { success: true, data: employee }
  } catch (error) {
    console.error('Error fetching employee:', error)
    return { success: false, error: 'Failed to fetch employee data' }
  }
}

export async function uploadDocument(
  employeeId: string,
  file: File,
  fieldName: string
) {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${fieldName}_${Date.now()}.${fileExt}`
    const filePath = `${employeeId}/${fileName}`

    const { data, error } = await supabase.storage
      .from('employee-documents')
      .upload(filePath, file)

    if (error) throw error

    await prisma.employeeDocuments.update({
      where: { employeeId },
      data: {
        [fieldName]: filePath,
      },
    })

    return { success: true, path: filePath }
  } catch (error) {
    console.error('Error uploading document:', error)
    return { success: false, error: 'Failed to upload document' }
  }
}
