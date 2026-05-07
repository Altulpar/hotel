import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { prisma } from "@/lib/db";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";
import { ContactForm } from "@/components/public/ContactForm";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export const metadata = { title: "İletişim" };

export default async function ContactPage() {
  const hotel = await prisma.hotelInfo.findFirst();
  const whatsapp = hotel?.whatsapp?.replace(/[^0-9]/g, "");
  return (
    <>
      <PublicNav />
      <PageHero eyebrow="İletişim" title="Bize ulaşın, otel hakkında bilgi alın." description="Telefon, WhatsApp, e-posta ve iletişim formu ile bize ulaşabilirsiniz." />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <section>
          <div className="grid gap-4">
            {hotel?.phone && (
              <a href={`tel:${hotel.phone}`} className="flex items-center gap-3 rounded-lg bg-white p-5 shadow-soft">
                <Phone className="text-coast-clay" /> <span>{hotel.phone}</span>
              </a>
            )}
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} className="flex items-center gap-3 rounded-lg bg-white p-5 shadow-soft">
                <MessageCircle className="text-coast-clay" /> <span>WhatsApp ile yazın</span>
              </a>
            )}
            {hotel?.email && (
              <a href={`mailto:${hotel.email}`} className="flex items-center gap-3 rounded-lg bg-white p-5 shadow-soft">
                <Mail className="text-coast-clay" /> <span>{hotel.email}</span>
              </a>
            )}
            {hotel?.address && (
              <div className="flex items-start gap-3 rounded-lg bg-white p-5 shadow-soft">
                <MapPin className="mt-1 text-coast-clay" /> <span>{hotel.address}</span>
              </div>
            )}
          </div>
          {hotel?.googleMapsUrl && (
            <Button href={hotel.googleMapsUrl} variant="primary" className="mt-6">
              Yol Tarifi Al
            </Button>
          )}
        </section>
        <ContactForm />
        {hotel?.googleMapsEmbed && (
          <section className="md:col-span-2">
            <div
              className="overflow-hidden rounded-lg border border-coast-sage/20"
              dangerouslySetInnerHTML={{ __html: hotel.googleMapsEmbed }}
            />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
