import { Mail, MapPin, Phone } from "lucide-react";
import { prisma } from "@/lib/db";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";

export const dynamic = "force-dynamic";

export const metadata = { title: "İletişim" };

export default async function ContactPage() {
  const hotel = await prisma.hotelInfo.findFirst();
  return (
    <>
      <PublicNav />
      <PageHero eyebrow="İletişim" title="Bize ulaşın, otel hakkında bilgi alın." description="Telefon ve e-posta ile bize ulaşabilirsiniz." />
      <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <section>
          <div className="grid gap-4">
            {hotel?.phone && (
              <a href={`tel:${hotel.phone}`} className="flex items-center gap-3 rounded-lg bg-white p-5 shadow-soft">
                <Phone className="text-coast-clay" /> <span>{hotel.phone}</span>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
