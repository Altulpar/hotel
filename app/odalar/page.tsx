import Image from "next/image";
import { prisma } from "@/lib/db";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";

export const metadata = { title: "Odalar" };

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({
    where: { status: "PUBLISHED" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" }
  });
  return (
    <>
      <PublicNav />
      <PageHero
        eyebrow="Odalar"
        title="Fiyat ve rezervasyon akışı olmadan, sadece oda bilgileri."
        description="Odalarımızı kapasite, yatak tipi, manzara ve olanaklarıyla inceleyebilirsiniz."
      />
      <main className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-8">
          {rooms.map((room) => (
            <article key={room.id} className="grid overflow-hidden rounded-lg border border-coast-sage/20 bg-white md:grid-cols-[1fr_1fr]">
              <div className="relative min-h-[320px]">
                <Image
                  src={room.images[0]?.imageUrl || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80"}
                  alt={room.images[0]?.altText || room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <h2 className="font-serif text-3xl font-semibold">{room.name}</h2>
                <p className="mt-3 leading-7 text-coast-ink/70">{room.description}</p>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div><dt className="text-sm text-coast-ink/50">Kapasite</dt><dd className="font-semibold">{room.capacity}</dd></div>
                  <div><dt className="text-sm text-coast-ink/50">Yatak</dt><dd className="font-semibold">{room.bedType}</dd></div>
                  <div><dt className="text-sm text-coast-ink/50">Manzara</dt><dd className="font-semibold">{room.viewType}</dd></div>
                  <div><dt className="text-sm text-coast-ink/50">Olanaklar</dt><dd className="font-semibold">{room.amenities}</dd></div>
                </dl>
                {room.notes && <p className="mt-5 text-sm text-coast-ink/60">{room.notes}</p>}
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
