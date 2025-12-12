'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { createSession, setSessionCookie, deleteSession, getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function loginAdmin(email: string, password: string) {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { email },
    })

    if (!admin) {
      return { success: false, error: 'Invalid credentials' }
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash)

    if (!isValid) {
      return { success: false, error: 'Invalid credentials' }
    }

    const token = await createSession({
      userId: admin.id,
      email: admin.email,
      role: admin.role,
    })

    await setSessionCookie(token)

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Login failed' }
  }
}

export async function logoutAdmin() {
  await deleteSession()
  redirect('/admin/login')
}

export async function getAdminSession() {
  return await getSession()
}

export async function createAdminUser(email: string, password: string, name: string) {
  try {
    const existing = await prisma.adminUser.findUnique({
      where: { email },
    })

    if (existing) {
      return { success: false, error: 'Admin already exists' }
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        name,
        role: 'ADMIN',
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating admin:', error)
    return { success: false, error: 'Failed to create admin' }
  }
}

export async function getAllEmployees() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        documents: true,
      },
    })

    return { success: true, data: employees }
  } catch (error) {
    console.error('Error fetching employees:', error)
    return { success: false, error: 'Failed to fetch employees' }
  }
}

export async function getEmployeeStats() {
  try {
    const [total, draft, submitted, verified, rejected] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { status: 'DRAFT' } }),
      prisma.employee.count({ where: { status: 'SUBMITTED' } }),
      prisma.employee.count({ where: { status: 'VERIFIED' } }),
      prisma.employee.count({ where: { status: 'REJECTED' } }),
    ])

    return {
      success: true,
      data: { total, draft, submitted, verified, rejected },
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { success: false, error: 'Failed to fetch stats' }
  }
}

export async function updateEmployeeStatus(
  employeeId: string,
  status: 'VERIFIED' | 'REJECTED',
  adminId: string,
  reason?: string
) {
  try {
    await prisma.$transaction([
      prisma.employee.update({
        where: { id: employeeId },
        data: { status },
      }),
      prisma.auditLog.create({
        data: {
          adminId,
          employeeId,
          action: `Status changed to ${status}`,
          details: reason || null,
        },
      }),
    ])

    revalidatePath('/admin/employees')
    revalidatePath(`/admin/employees/${employeeId}`)
    
    return { success: true }
  } catch (error) {
    console.error('Error updating status:', error)
    return { success: false, error: 'Failed to update status' }
  }
}

export async function getAuditLogs(employeeId: string) {
  try {
    const logs = await prisma.auditLog.findMany({
      where: { employeeId },
      include: {
        admin: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
    })

    return { success: true, data: logs }
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    return { success: false, error: 'Failed to fetch audit logs' }
  }
}
