import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";

export const metadata = { title: "Duyurular" };

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { date: "desc" }
  });
  return (
    <>
      <PublicNav />
      <PageHero eyebrow="Duyurular" title="Otel ve ada hayatından güncel notlar." description="Kahvaltı menüsü güncellemeleri, sezon bilgileri, yerel festival ve özel gün duyuruları." />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3 md:py-24">
        {announcements.map((item) => (
          <Link key={item.id} href={`/duyurular/${item.slug}`} className="overflow-hidden rounded-lg border border-coast-sage/20 bg-white transition hover:-translate-y-1 hover:shadow-soft">
            <div className="relative aspect-[4/3] bg-coast-mist">
              {item.imageUrl && <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />}
            </div>
            <div className="p-5">
              <p className="text-sm text-coast-clay">{formatDate(item.date)}</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-coast-ink/65">{item.summary}</p>
            </div>
          </Link>
        ))}
      </main>
      <Footer />
    </>
  );
}
