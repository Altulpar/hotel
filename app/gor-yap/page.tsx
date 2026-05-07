import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { prisma } from "@/lib/db";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";

export const dynamic = "force-dynamic";

export const metadata = { title: "Gör & Yap" };

export default async function NearbyPage() {
  const places = await prisma.nearbyPlace.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" }
  });
  return (
    <>
      <PublicNav />
      <PageHero eyebrow="Gör & Yap" title="Otel çevresinde keşfedilecek yerler." description="Yakın rotalar, ada köyleri, sahil yürüyüşleri ve yerel deneyimler." />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3 md:py-24">
        {places.map((place) => (
          <article key={place.id} className="overflow-hidden rounded-lg border border-coast-sage/20 bg-white">
            <div className="relative aspect-[4/3] bg-coast-mist">
              {place.imageUrl && <Image src={place.imageUrl} alt={place.name} fill className="object-cover" />}
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold text-coast-clay">{place.distance}</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold">{place.name}</h2>
              <p className="mt-2 leading-7 text-coast-ink/65">{place.description}</p>
              {place.mapUrl && (
                <a href={place.mapUrl} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-coast-deep">
                  Haritada Aç <ExternalLink size={16} />
                </a>
              )}
            </div>
          </article>
        ))}
      </main>
      <Footer />
    </>
  );
}
