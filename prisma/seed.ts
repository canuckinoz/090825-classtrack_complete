import { PrismaClient, Role, Subrole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password', 12);
  // Regions
  const regionA = 'REG-A';
  const regionB = 'REG-B';
  // Schools
  const school1 = 'SCH-Alpha';
  const school2 = 'SCH-Beta';
  const school3 = 'SCH-Gamma';

  // Create central users
  await prisma.user.upsert({
    where: { email: 'ceo@example.com' },
    create: {
      email: 'ceo@example.com',
      passwordHash: hash,
      role: Role.CENTRAL,
      subroles: [Subrole.CEO],
      orgId: 'HQ',
      regionIds: [regionA, regionB],
      scope: { regionIds: [regionA, regionB] },
      permissions: [],
    },
    update: {},
  });
  await prisma.user.upsert({
    where: { email: 'district-a@example.com' },
    create: {
      email: 'district-a@example.com',
      passwordHash: hash,
      role: Role.CENTRAL,
      subroles: [Subrole.DISTRICT_ADMIN],
      orgId: 'REG-Office-A',
      regionIds: [regionA],
      scope: { regionIds: [regionA] },
      permissions: [],
    },
    update: {},
  });

  // School leaders
  for (const [email, orgId] of [
    ['principal-alpha@example.com', school1],
    ['principal-beta@example.com', school2],
    ['principal-gamma@example.com', school3],
  ] as const) {
    await prisma.user.upsert({
      where: { email },
      create: {
        email,
        passwordHash: hash,
        role: Role.LEADER,
        subroles: [Subrole.PRINCIPAL],
        orgId,
        regionIds: orgId === school3 ? [regionB] : [regionA],
        scope: { schoolIds: [orgId] },
        permissions: [],
      },
      update: {},
    });
  }

  // Teachers
  for (let i = 1; i <= 5; i++) {
    await prisma.user.upsert({
      where: { email: `t${i}-alpha@example.com` },
      create: {
        email: `t${i}-alpha@example.com`,
        passwordHash: hash,
        role: Role.TEACHER,
        subroles: [],
        orgId: school1,
        regionIds: [regionA],
        scope: { classIds: [`CLASS-A-${i}`, `CLASS-A-${i + 5}`] },
        permissions: [],
      },
      update: {},
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
