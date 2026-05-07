import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteCalendarAction, saveCalendarAction } from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const statusOptions = [{ value: "PUBLISHED", label: "Yayında" }, { value: "DRAFT", label: "Taslak" }];
const categoryOptions = [
  ["BREAKFAST", "Kahvaltı"],
  ["EVENT", "Etkinlik"],
  ["ANNOUNCEMENT", "Duyuru"],
  ["LOCAL_ACTIVITY", "Yerel Aktivite"]
].map(([value, label]) => ({ value, label }));

function dateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function AdminCalendarPage() {
  const admin = await requireAdmin();
  const items = await prisma.calendarItem.findMany({ orderBy: { date: "asc" } });
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">Etkinlik Takvimi</h1>
      <form action={saveCalendarAction} className="mt-8 grid gap-5 rounded-lg bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl font-semibold">Takvim öğesi ekle</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Başlık" name="title" required />
          <Field label="Tarih" name="date" type="date" required />
          <Field label="Başlangıç saati" name="startTime" type="time" />
          <Field label="Bitiş saati" name="endTime" type="time" />
          <SelectField label="Kategori" name="category" defaultValue="BREAKFAST" options={categoryOptions} />
          <SelectField label="Durum" name="status" defaultValue="PUBLISHED" options={statusOptions} />
          <ImageUploadField />
        </div>
        <Field label="Açıklama" name="description" textarea required />
        <Button type="submit">Ekle</Button>
      </form>
      <div className="mt-8 grid gap-5">
        {items.map((item) => (
          <section key={item.id} className="rounded-lg bg-white p-5 shadow-soft">
            <form action={saveCalendarAction} className="grid gap-4">
              <input type="hidden" name="id" value={item.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Başlık" name="title" defaultValue={item.title} required />
                <Field label="Tarih" name="date" type="date" defaultValue={dateInput(item.date)} required />
                <Field label="Başlangıç saati" name="startTime" type="time" defaultValue={item.startTime} />
                <Field label="Bitiş saati" name="endTime" type="time" defaultValue={item.endTime} />
                <SelectField label="Kategori" name="category" defaultValue={item.category} options={categoryOptions} />
                <SelectField label="Durum" name="status" defaultValue={item.status} options={statusOptions} />
                <ImageUploadField defaultValue={item.imageUrl} />
              </div>
              <Field label="Açıklama" name="description" defaultValue={item.description} textarea required />
              <Button type="submit">Kaydet</Button>
            </form>
            <form action={deleteCalendarAction} className="mt-3">
              <input type="hidden" name="id" value={item.id} />
              <Button type="submit" variant="danger">Sil</Button>
            </form>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}
