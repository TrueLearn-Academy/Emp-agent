const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Check if admin already exists
  const existing = await prisma.adminUser.findUnique({
    where: { email: 'admin@truezen.com' }
  })

  if (existing) {
    console.log('Admin user already exists!')
    console.log('Email: admin@truezen.com')
    console.log('Password: 12345678@Ab!')
    return
  }

  const email = 'admin@truezen.com'
  const password = '12345678@Ab!'
  const name = 'TrueZen Admin'

  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created successfully!')
  console.log('Email:', admin.email)
  console.log('Password: 12345678@Ab!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
