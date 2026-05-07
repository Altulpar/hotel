import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { updateHotelInfoAction } from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const admin = await requireAdmin();
  const hotel = await prisma.hotelInfo.findFirst();
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">Otel Bilgileri</h1>
      <form action={updateHotelInfoAction} className="mt-8 grid gap-5 rounded-lg bg-white p-6 shadow-soft">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Otel adı" name="hotelName" defaultValue={hotel?.hotelName} required />
          <Field label="Slogan" name="slogan" defaultValue={hotel?.slogan} required />
          <Field label="Telefon" name="phone" defaultValue={hotel?.phone} required />
          <Field label="WhatsApp" name="whatsapp" defaultValue={hotel?.whatsapp} required />
          <Field label="E-posta" name="email" defaultValue={hotel?.email} type="email" required />
          <Field label="Adres" name="address" defaultValue={hotel?.address} required />
          <Field label="Google Maps link" name="googleMapsUrl" defaultValue={hotel?.googleMapsUrl} />
          <Field label="Instagram link" name="instagramUrl" defaultValue={hotel?.instagramUrl} />
          <Field label="Facebook link" name="facebookUrl" defaultValue={hotel?.facebookUrl} />
          <ImageUploadField name="heroImageUrl" label="Hero görseli" defaultValue={hotel?.heroImageUrl} />
        </div>
        <Field label="Hakkımızda metni" name="aboutText" defaultValue={hotel?.aboutText} textarea rows={7} required />
        <Field label="Konum açıklaması" name="locationText" defaultValue={hotel?.locationText} textarea rows={4} required />
        <Field label="Google Maps embed kodu" name="googleMapsEmbed" defaultValue={hotel?.googleMapsEmbed} textarea rows={3} />
        <Button type="submit">Kaydet</Button>
      </form>
    </AdminShell>
  );
}
