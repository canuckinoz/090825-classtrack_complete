const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const demoEmail = 'teacher@example.com';
  const passwordHash = await bcrypt.hash('password', 10);

  await prisma.user.upsert({
    where: { email: demoEmail },
    create: {
      email: demoEmail,
      passwordHash,
      name: 'Demo Teacher',
      role: 'teacher',
    },
    update: { name: 'Demo Teacher' },
  });

  const students = [
    { name: 'Ava Chen', classId: 'CLASS-3A' },
    { name: 'Liam Nguyen', classId: 'CLASS-3A' },
    { name: 'Sophie Taylor', classId: 'CLASS-3A' },
  ];
  for (const s of students) {
    const existing = await prisma.student.findFirst({
      where: { name: s.name },
    });
    if (existing) {
      await prisma.student.update({
        where: { id: existing.id },
        data: { classId: s.classId },
      });
    } else {
      await prisma.student.create({ data: s });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
