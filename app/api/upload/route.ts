import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const employeeId = formData.get('employeeId') as string
    const fieldName = formData.get('fieldName') as string

    if (!file || !employeeId || !fieldName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${fieldName}_${Date.now()}.${fileExt}`
    const filePath = `${employeeId}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('employee-documents')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { success: false, error: 'Upload failed' },
        { status: 500 }
      )
    }

    // Update database
    await prisma.employeeDocuments.update({
      where: { employeeId },
      data: {
        [fieldName]: filePath,
      },
    })

    return NextResponse.json({
      success: true,
      path: filePath,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    )
  }
}
