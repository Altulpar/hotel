import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteGalleryAction, saveGalleryAction } from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const categories = [
  ["ROOMS", "Odalar"],
  ["EXTERIOR", "Dış Mekan"],
  ["VIEW", "Manzara"],
  ["BREAKFAST", "Kahvaltı"],
  ["RESTAURANT", "Restoran/Kafe"],
  ["EVENTS", "Etkinlikler"],
  ["NEARBY", "Yakın Yerler"]
].map(([value, label]) => ({ value, label }));

export default async function AdminGalleryPage() {
  const admin = await requireAdmin();
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">Galeri</h1>
      <form action={saveGalleryAction} className="mt-8 grid gap-5 rounded-lg bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl font-semibold">Görsel ekle</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Başlık" name="title" required />
          <Field label="Alt metin" name="altText" required />
          <SelectField label="Kategori" name="category" defaultValue="ROOMS" options={categories} />
          <Field label="Sıralama" name="sortOrder" type="number" defaultValue={0} />
          <ImageUploadField />
        </div>
        <Button type="submit">Ekle</Button>
      </form>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {images.map((image) => (
          <form key={image.id} action={saveGalleryAction} className="grid gap-4 rounded-lg bg-white p-5 shadow-soft">
            <input type="hidden" name="id" value={image.id} />
            <Field label="Başlık" name="title" defaultValue={image.title} required />
            <Field label="Alt metin" name="altText" defaultValue={image.altText} required />
            <SelectField label="Kategori" name="category" defaultValue={image.category} options={categories} />
            <Field label="Sıralama" name="sortOrder" type="number" defaultValue={image.sortOrder} />
            <ImageUploadField defaultValue={image.imageUrl} />
            <div className="flex gap-3">
              <Button type="submit">Kaydet</Button>
            </div>
          </form>
        ))}
        {images.map((image) => (
          <form key={`${image.id}-delete`} action={deleteGalleryAction}>
            <input type="hidden" name="id" value={image.id} />
            <Button type="submit" variant="danger">Sil: {image.title}</Button>
          </form>
        ))}
      </div>
    </AdminShell>
  );
}
