import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  deleteRoomAction,
  deleteRoomImageAction,
  reorderRoomImageAction,
  saveRoomAction
} from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export const dynamic = "force-dynamic";

export default async function AdminRoomsPage() {
  const admin = await requireAdmin();
  const rooms = await prisma.room.findMany({
    include: { images: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] } },
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
            {room.images.length > 0 && (
              <div className="mt-6 border-t border-coast-sage/20 pt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-coast-ink">Oda görselleri</h3>
                  <span className="text-xs text-coast-ink/55">
                    {room.images.length} görsel · İlk görsel kapaktır
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {room.images.map((image, index) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-xl border border-coast-sage/25 bg-coast-mist/35"
                    >
                      <div className="relative aspect-[4/3] bg-coast-mist">
                        <Image
                          src={image.imageUrl}
                          alt={image.altText}
                          fill
                          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 90vw"
                          className="object-cover"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {index + 1}
                        </span>
                        {index === 0 && (
                          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-coast-clay px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                            <Star size={13} fill="currentColor" aria-hidden="true" /> Kapak
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 p-3">
                        <form action={reorderRoomImageAction}>
                          <input type="hidden" name="id" value={image.id} />
                          <input type="hidden" name="intent" value="previous" />
                          <button
                            type="submit"
                            disabled={index === 0}
                            aria-label="Görseli sola taşı"
                            className="flex min-h-10 w-full items-center justify-center rounded-md border border-coast-sage/30 bg-white text-coast-deep transition hover:bg-coast-mist disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <ArrowLeft size={17} aria-hidden="true" />
                          </button>
                        </form>
                        <form action={reorderRoomImageAction}>
                          <input type="hidden" name="id" value={image.id} />
                          <input type="hidden" name="intent" value="next" />
                          <button
                            type="submit"
                            disabled={index === room.images.length - 1}
                            aria-label="Görseli sağa taşı"
                            className="flex min-h-10 w-full items-center justify-center rounded-md border border-coast-sage/30 bg-white text-coast-deep transition hover:bg-coast-mist disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <ArrowRight size={17} aria-hidden="true" />
                          </button>
                        </form>
                        <form action={deleteRoomImageAction}>
                          <input type="hidden" name="id" value={image.id} />
                          <button
                            type="submit"
                            aria-label="Görseli sil"
                            className="flex min-h-10 w-full items-center justify-center rounded-md bg-red-50 text-red-700 transition hover:bg-red-100"
                          >
                            <Trash2 size={17} aria-hidden="true" />
                          </button>
                        </form>
                        {index > 0 && (
                          <form action={reorderRoomImageAction} className="col-span-3">
                            <input type="hidden" name="id" value={image.id} />
                            <input type="hidden" name="intent" value="cover" />
                            <button
                              type="submit"
                              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-coast-deep px-3 text-xs font-semibold text-white transition hover:bg-coast-ink"
                            >
                              <Star size={15} aria-hidden="true" /> Kapak görseli yap
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
