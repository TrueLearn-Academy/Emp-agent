const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@truezen.com'
  const password = '12345678@Ab!'
  const name = 'Admin User'

  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', admin.email)
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
