import Image from "next/image";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";

const labels: Record<string, string> = {
  BREAKFAST: "Kahvaltı",
  EVENT: "Etkinlik",
  ANNOUNCEMENT: "Duyuru",
  LOCAL_ACTIVITY: "Yerel Aktivite"
};

export const metadata = { title: "Etkinlik Takvimi" };

export default async function CalendarPage() {
  const items = await prisma.calendarItem.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { date: "asc" }
  });
  return (
    <>
      <PublicNav />
      <PageHero eyebrow="Takvim" title="Kahvaltı, etkinlik ve ada notları." description="Özel kahvaltı menüleri, otel etkinlikleri, yerel aktiviteler ve sezon duyuruları." />
      <main className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="grid gap-5">
          {items.map((item) => (
            <article key={item.id} className="grid gap-5 rounded-lg border border-coast-sage/20 bg-white p-5 md:grid-cols-[180px_1fr]">
              {item.imageUrl ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex min-h-32 items-center justify-center rounded-md bg-coast-mist text-center font-serif text-3xl text-coast-deep">
                  {new Date(item.date).getDate()}
                </div>
              )}
              <div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="font-semibold text-coast-clay">{labels[item.category]}</span>
                  <span>{formatDate(item.date)}</span>
                  {(item.startTime || item.endTime) && <span>{item.startTime} - {item.endTime}</span>}
                </div>
                <h2 className="mt-2 font-serif text-3xl font-semibold">{item.title}</h2>
                <p className="mt-2 leading-7 text-coast-ink/65">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
