import Image from "next/image";
import { prisma } from "@/lib/db";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, string> = {
  ROOMS: "Odalar",
  EXTERIOR: "Dış Mekan",
  VIEW: "Manzara",
  BREAKFAST: "Kahvaltı",
  RESTAURANT: "Restoran/Kafe",
  EVENTS: "Etkinlikler",
  NEARBY: "Yakın Yerler"
};

export const metadata = { title: "Galeri" };

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return (
    <>
      <PublicNav />
      <PageHero eyebrow="Galeri" title="Otelin atmosferinden kareler." description="Odalar, manzara, kahvaltı, etkinlikler ve çevredeki keşif noktaları." />
      <main className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <figure key={image.id} className="overflow-hidden rounded-lg bg-white shadow-soft">
              <div className="relative aspect-[4/3]">
                <Image src={image.imageUrl} alt={image.altText} fill className="object-cover" />
              </div>
              <figcaption className="flex items-center justify-between gap-4 p-4">
                <span className="font-semibold">{image.title}</span>
                <span className="rounded-full bg-coast-mist px-3 py-1 text-xs">{categoryLabels[image.category]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
