import { prisma } from "@/lib/db";
import { requireOwner } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { CreateAdminForm } from "@/components/admin/CreateAdminForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Yöneticiler" };

export default async function AdminUsersPage() {
  const admin = await requireOwner();
  const admins = await prisma.adminUser.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" }
  });

  return (
    <AdminShell adminName={admin.name} adminRole={admin.role}>
      <h1 className="font-serif text-4xl font-semibold">Yöneticiler</h1>
      <p className="mt-3 text-coast-ink/65">
        Admin paneline erişebilecek yeni bir hesap oluşturun.
      </p>

      <CreateAdminForm />

      <section className="mt-8 rounded-lg bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl font-semibold">Mevcut yöneticiler</h2>
        <div className="mt-5 grid gap-3">
          {admins.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-coast-sage/20 px-4 py-3"
            >
              <div>
                <p className="font-semibold text-coast-ink">{item.name}</p>
                <p className="text-sm text-coast-ink/60">{item.email}</p>
                <p className="mt-1 text-xs text-coast-ink/45">
                  {item.role === "OWNER" ? "Ana yönetici" : "İçerik yöneticisi"}
                </p>
              </div>
              {item.id === admin.id && (
                <span className="rounded-full bg-coast-mist px-3 py-1 text-xs font-semibold text-coast-deep">
                  Aktif hesap
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
