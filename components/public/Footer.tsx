import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/db";

export async function Footer() {
  const hotel = await prisma.hotelInfo.findFirst();
  return (
    <footer className="bg-coast-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl">{hotel?.hotelName || "Ada Ruhu Otel"}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/70">{hotel?.slogan}</p>
        </div>
        <div>
          <p className="font-semibold">Menü</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <Link href="/odalar">Odalar</Link>
            <Link href="/galeri">Galeri</Link>
            <Link href="/hizmetler">Hizmetler</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">İletişim</p>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            {hotel?.phone && (
              <a href={`tel:${hotel.phone}`} className="flex items-center gap-2">
                <Phone size={16} /> {hotel.phone}
              </a>
            )}
            {hotel?.email && (
              <a href={`mailto:${hotel.email}`} className="flex items-center gap-2">
                <Mail size={16} /> {hotel.email}
              </a>
            )}
            {hotel?.instagramUrl && (
              <a href={hotel.instagramUrl} className="flex items-center gap-2">
                <Instagram size={16} /> Instagram
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {hotel?.hotelName || "Ada Ruhu Otel"}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
