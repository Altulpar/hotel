import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = { title: "Admin Panel" };

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const [rooms, gallery, unread, announcements, services, calendar] = await Promise.all([
    prisma.room.count(),
    prisma.galleryImage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.announcement.count({ where: { status: "PUBLISHED" } }),
    prisma.service.count(),
    prisma.calendarItem.count()
  ]);
  const cards = [
    ["Toplam Oda", rooms],
    ["Galeri Görseli", gallery],
    ["Okunmamış Mesaj", unread],
    ["Aktif Duyuru", announcements],
    ["Hizmet", services],
    ["Takvim Öğesi", calendar]
  ];
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">Genel Bakış</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white p-6 shadow-soft">
            <p className="text-sm text-coast-ink/60">{label}</p>
            <p className="mt-3 text-4xl font-semibold text-coast-deep">{value}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
