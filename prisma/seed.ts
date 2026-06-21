import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PERMISSIONS, DEFAULT_ROLES } from "../lib/permissions";

const prisma = new PrismaClient();

async function main() {
  // 1. Permissions
  for (const p of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name: p.name },
      update: { label: p.label, group: p.group },
      create: { name: p.name, label: p.label, group: p.group },
    });
  }
  console.log(`✓ ${PERMISSIONS.length} permissions ensured`);

  // 2. Roles (with permission connections)
  for (const role of DEFAULT_ROLES) {
    const permissions = await prisma.permission.findMany({
      where: { name: { in: role.permissions } },
      select: { id: true },
    });

    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        label: role.label,
        description: role.description,
        isSystem: role.isSystem,
        permissions: { set: permissions.map((p) => ({ id: p.id })) },
      },
      create: {
        name: role.name,
        label: role.label,
        description: role.description,
        isSystem: role.isSystem,
        permissions: { connect: permissions.map((p) => ({ id: p.id })) },
      },
    });
  }
  console.log(`✓ ${DEFAULT_ROLES.length} roles ensured`);

  // 3. Initial admin user
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@syndicate.iq";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "Admin@12345";
  const name = process.env.SEED_ADMIN_NAME ?? "مدير النظام";

  const superAdmin = await prisma.role.findUnique({
    where: { name: "super-admin" },
  });

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      isActive: true,
      roles: superAdmin ? { set: [{ id: superAdmin.id }] } : undefined,
    },
    create: {
      name,
      email,
      passwordHash,
      isActive: true,
      roles: superAdmin ? { connect: { id: superAdmin.id } } : undefined,
    },
  });
  console.log(`✓ admin user ensured: ${email}`);
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
