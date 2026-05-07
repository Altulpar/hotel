import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteRoomAction, deleteRoomImageAction, saveRoomAction } from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default async function AdminRoomsPage() {
  const admin = await requireAdmin();
  const rooms = await prisma.room.findMany({
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" }
  });
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">Odalar</h1>
      <form action={saveRoomAction} className="mt-8 grid gap-5 rounded-lg bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl font-semibold">Yeni oda ekle</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Oda adı" name="name" required />
          <Field label="Kapasite" name="capacity" required />
          <Field label="Yatak tipi" name="bedType" required />
          <Field label="Manzara tipi" name="viewType" required />
          <Field label="Olanaklar" name="amenities" required />
          <Field label="Sıralama" name="sortOrder" type="number" defaultValue={0} />
          <SelectField label="Durum" name="status" defaultValue="PUBLISHED" options={[{ value: "PUBLISHED", label: "Yayında" }, { value: "DRAFT", label: "Taslak" }]} />
          <ImageUploadField name="imageUrl" label="İlk oda görseli" />
          <Field label="Görsel alt metni" name="imageAlt" />
        </div>
        <Field label="Açıklama" name="description" textarea rows={4} required />
        <Field label="Notlar" name="notes" textarea rows={3} />
        <Button type="submit">Oda Oluştur</Button>
      </form>
      <div className="mt-8 grid gap-5">
        {rooms.map((room) => (
          <section key={room.id} className="rounded-lg bg-white p-6 shadow-soft">
            <form action={saveRoomAction} className="grid gap-4">
              <input type="hidden" name="id" value={room.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Oda adı" name="name" defaultValue={room.name} required />
                <Field label="Kapasite" name="capacity" defaultValue={room.capacity} required />
                <Field label="Yatak tipi" name="bedType" defaultValue={room.bedType} required />
                <Field label="Manzara tipi" name="viewType" defaultValue={room.viewType} required />
                <Field label="Olanaklar" name="amenities" defaultValue={room.amenities} required />
                <Field label="Sıralama" name="sortOrder" type="number" defaultValue={room.sortOrder} />
                <SelectField label="Durum" name="status" defaultValue={room.status} options={[{ value: "PUBLISHED", label: "Yayında" }, { value: "DRAFT", label: "Taslak" }]} />
                <ImageUploadField name="imageUrl" label="Yeni görsel ekle" />
                <Field label="Yeni görsel alt metni" name="imageAlt" />
              </div>
              <Field label="Açıklama" name="description" defaultValue={room.description} textarea rows={4} required />
              <Field label="Notlar" name="notes" defaultValue={room.notes} textarea rows={3} />
              <Button type="submit">Kaydet</Button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {room.images.map((image) => (
                <form key={image.id} action={deleteRoomImageAction}>
                  <input type="hidden" name="id" value={image.id} />
                  <button className="rounded-md bg-coast-mist px-3 py-2 text-xs" type="submit">
                    Görseli Sil
                  </button>
                </form>
              ))}
            </div>
            <form action={deleteRoomAction} className="mt-3">
              <input type="hidden" name="id" value={room.id} />
              <Button type="submit" variant="danger">Odayı Sil</Button>
            </form>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}
