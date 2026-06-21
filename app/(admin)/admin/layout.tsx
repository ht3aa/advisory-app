import { requireUser } from "@/lib/dal";
import { AdminShell } from "@/components/admin/admin-shell";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <>
      <AdminShell
        user={{
          name: user.name,
          email: user.email,
          permissions: user.permissions,
          isSuperAdmin: user.isSuperAdmin,
        }}
      >
        {children}
      </AdminShell>
      <Toaster />
    </>
  );
}
