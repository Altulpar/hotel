import Link from "next/link";
import { prisma } from "@/lib/db";
import { PublicNavMenu } from "@/components/public/PublicNavMenu";

const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Odalar", href: "/odalar" },
  { label: "Galeri", href: "/galeri" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Etkinlik Takvimi", href: "/etkinlik-takvimi" },
  { label: "Duyurular", href: "/duyurular" },
  { label: "Gör & Yap", href: "/gor-yap" },
  { label: "İletişim", href: "/iletisim" }
];

const desktopItems = navItems.filter((item) =>
  ["/", "/odalar", "/galeri", "/hizmetler", "/iletisim"].includes(item.href)
);

export async function PublicNav() {
  const hotel = await prisma.hotelInfo.findFirst();
  return (
    <header className="sticky top-0 z-50 border-b border-coast-sage/20 bg-[#fbfaf6]/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:py-4">
        <Link href="/" className="min-w-0 truncate font-serif text-xl font-semibold text-coast-deep md:text-2xl">
          {hotel?.hotelName || "Ada Ruhu Otel"}
        </Link>
        <PublicNavMenu
          navItems={navItems}
          desktopItems={desktopItems}
          phone={hotel?.phone}
          email={hotel?.email}
          googleMapsUrl={hotel?.googleMapsUrl}
        />
      </div>
    </header>
  );
}
