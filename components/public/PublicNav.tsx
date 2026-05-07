import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { prisma } from "@/lib/db";

const navItems = [
  ["Ana Sayfa", "/"],
  ["Hakkımızda", "/hakkimizda"],
  ["Odalar", "/odalar"],
  ["Galeri", "/galeri"],
  ["Hizmetler", "/hizmetler"],
  ["Etkinlik Takvimi", "/etkinlik-takvimi"],
  ["Duyurular", "/duyurular"],
  ["Gör & Yap", "/gor-yap"],
  ["İletişim", "/iletisim"]
];

export async function PublicNav() {
  const hotel = await prisma.hotelInfo.findFirst();
  return (
    <header className="sticky top-0 z-50 border-b border-coast-sage/20 bg-[#fbfaf6]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-2xl font-semibold text-coast-deep">
          {hotel?.hotelName || "Ada Ruhu Otel"}
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-coast-ink lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-coast-clay">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {hotel?.phone && (
            <a
              href={`tel:${hotel.phone}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-coast-mist text-coast-deep"
              aria-label="Telefon"
            >
              <Phone size={18} />
            </a>
          )}
          {hotel?.email && (
            <a
              href={`mailto:${hotel.email}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-coast-mist text-coast-deep"
              aria-label="E-posta"
            >
              <Mail size={18} />
            </a>
          )}
          {hotel?.googleMapsUrl && (
            <a
              href={hotel.googleMapsUrl}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-coast-deep text-white"
              aria-label="Yol tarifi"
            >
              <MapPin size={18} />
            </a>
          )}
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-coast-sage/10 px-4 py-3 text-sm font-medium lg:hidden">
        {navItems.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
