import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteServiceAction, saveServiceAction } from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export const dynamic = "force-dynamic";

const statusOptions = [{ value: "PUBLISHED", label: "Yayında" }, { value: "DRAFT", label: "Taslak" }];
const iconOptions = ["Coffee", "Wifi", "Sparkles", "Car", "Utensils", "Trees", "Wind", "Map"].map((icon) => ({ value: icon, label: icon }));

export default async function AdminServicesPage() {
  const admin = await requireAdmin();
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">Hizmetler</h1>
      <form action={saveServiceAction} className="mt-8 grid gap-5 rounded-lg bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl font-semibold">Hizmet ekle</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Başlık" name="title" required />
          <SelectField label="İkon" name="icon" defaultValue="Sparkles" options={iconOptions} />
          <SelectField label="Durum" name="status" defaultValue="PUBLISHED" options={statusOptions} />
          <Field label="Sıralama" name="sortOrder" type="number" defaultValue={0} />
          <ImageUploadField />
        </div>
        <Field label="Açıklama" name="description" textarea required />
        <Button type="submit">Ekle</Button>
      </form>
      <div className="mt-8 grid gap-5">
        {services.map((service) => (
          <section key={service.id} className="rounded-lg bg-white p-5 shadow-soft">
            <form action={saveServiceAction} className="grid gap-4">
              <input type="hidden" name="id" value={service.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Başlık" name="title" defaultValue={service.title} required />
                <SelectField label="İkon" name="icon" defaultValue={service.icon} options={iconOptions} />
                <SelectField label="Durum" name="status" defaultValue={service.status} options={statusOptions} />
                <Field label="Sıralama" name="sortOrder" type="number" defaultValue={service.sortOrder} />
                <ImageUploadField defaultValue={service.imageUrl} />
              </div>
              <Field label="Açıklama" name="description" defaultValue={service.description} textarea required />
              <Button type="submit">Kaydet</Button>
            </form>
            <form action={deleteServiceAction} className="mt-3">
              <input type="hidden" name="id" value={service.id} />
              <Button type="submit" variant="danger">Sil</Button>
            </form>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}
