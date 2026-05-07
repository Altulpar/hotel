import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteNearbyAction, saveNearbyAction } from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const statusOptions = [{ value: "PUBLISHED", label: "Yayında" }, { value: "DRAFT", label: "Taslak" }];

export default async function AdminNearbyPage() {
  const admin = await requireAdmin();
  const places = await prisma.nearbyPlace.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">Gör & Yap</h1>
      <form action={saveNearbyAction} className="mt-8 grid gap-5 rounded-lg bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl font-semibold">Yakın yer ekle</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Yer adı" name="name" required />
          <Field label="Mesafe" name="distance" required />
          <Field label="Harita linki" name="mapUrl" />
          <Field label="Sıralama" name="sortOrder" type="number" defaultValue={0} />
          <SelectField label="Durum" name="status" defaultValue="PUBLISHED" options={statusOptions} />
          <ImageUploadField />
        </div>
        <Field label="Açıklama" name="description" textarea required />
        <Button type="submit">Ekle</Button>
      </form>
      <div className="mt-8 grid gap-5">
        {places.map((place) => (
          <section key={place.id} className="rounded-lg bg-white p-5 shadow-soft">
            <form action={saveNearbyAction} className="grid gap-4">
              <input type="hidden" name="id" value={place.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Yer adı" name="name" defaultValue={place.name} required />
                <Field label="Mesafe" name="distance" defaultValue={place.distance} required />
                <Field label="Harita linki" name="mapUrl" defaultValue={place.mapUrl} />
                <Field label="Sıralama" name="sortOrder" type="number" defaultValue={place.sortOrder} />
                <SelectField label="Durum" name="status" defaultValue={place.status} options={statusOptions} />
                <ImageUploadField defaultValue={place.imageUrl} />
              </div>
              <Field label="Açıklama" name="description" defaultValue={place.description} textarea required />
              <Button type="submit">Kaydet</Button>
            </form>
            <form action={deleteNearbyAction} className="mt-3">
              <input type="hidden" name="id" value={place.id} />
              <Button type="submit" variant="danger">Sil</Button>
            </form>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}
