import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteAnnouncementAction, saveAnnouncementAction } from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const statusOptions = [{ value: "PUBLISHED", label: "Yayında" }, { value: "DRAFT", label: "Taslak" }];
const dateInput = (date: Date) => date.toISOString().slice(0, 10);

export default async function AdminAnnouncementsPage() {
  const admin = await requireAdmin();
  const announcements = await prisma.announcement.findMany({ orderBy: { date: "desc" } });
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">Duyurular</h1>
      <form action={saveAnnouncementAction} className="mt-8 grid gap-5 rounded-lg bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl font-semibold">Duyuru ekle</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Başlık" name="title" required />
          <Field label="Tarih" name="date" type="date" required />
          <SelectField label="Durum" name="status" defaultValue="PUBLISHED" options={statusOptions} />
          <ImageUploadField />
        </div>
        <Field label="Kısa açıklama" name="summary" textarea rows={3} required />
        <Field label="İçerik" name="content" textarea rows={7} required />
        <Button type="submit">Ekle</Button>
      </form>
      <div className="mt-8 grid gap-5">
        {announcements.map((item) => (
          <section key={item.id} className="rounded-lg bg-white p-5 shadow-soft">
            <form action={saveAnnouncementAction} className="grid gap-4">
              <input type="hidden" name="id" value={item.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Başlık" name="title" defaultValue={item.title} required />
                <Field label="Tarih" name="date" type="date" defaultValue={dateInput(item.date)} required />
                <SelectField label="Durum" name="status" defaultValue={item.status} options={statusOptions} />
                <ImageUploadField defaultValue={item.imageUrl} />
              </div>
              <Field label="Kısa açıklama" name="summary" defaultValue={item.summary} textarea rows={3} required />
              <Field label="İçerik" name="content" defaultValue={item.content} textarea rows={7} required />
              <Button type="submit">Kaydet</Button>
            </form>
            <form action={deleteAnnouncementAction} className="mt-3">
              <input type="hidden" name="id" value={item.id} />
              <Button type="submit" variant="danger">Sil</Button>
            </form>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}
