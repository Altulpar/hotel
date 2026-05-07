import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";

export default async function HomePage() {
  const [hotel, rooms, services, gallery, announcements] = await Promise.all([
    prisma.hotelInfo.findFirst(),
    prisma.room.findMany({
      where: { status: "PUBLISHED" },
      include: { images: { orderBy: { sortOrder: "asc" } } },
      orderBy: { sortOrder: "asc" },
      take: 3
    }),
    prisma.service.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
      take: 4
    }),
    prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" }, take: 4 }),
    prisma.announcement.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "desc" },
      take: 2
    })
  ]);

  return (
    <>
      <PublicNav />
      <main>
        <section className="relative min-h-[78vh] overflow-hidden">
          <Image
            src={hotel?.heroImageUrl || "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2200&q=80"}
            alt={`${hotel?.hotelName || "Ada Ruhu Otel"} manzarası`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coast-ink/75 via-coast-ink/35 to-transparent" />
          <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-24">
            <div className="max-w-3xl text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coast-sand">
                Butik otel deneyimi
              </p>
              <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight md:text-7xl">
                {hotel?.hotelName || "Ada Ruhu Otel"}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">{hotel?.slogan}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/odalar" variant="primary">
                  Odaları Gör <ArrowRight size={18} />
                </Button>
                <Button href="/iletisim" variant="secondary">
                  İletişime Geç
                </Button>
                {hotel?.googleMapsUrl && (
                  <Button href={hotel.googleMapsUrl} variant="secondary">
                    <MapPin size={18} /> Yol Tarifi Al
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1fr_1.1fr] md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coast-clay">
              Hakkımızda
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-coast-ink md:text-5xl">
              Sakin, sıcak ve fotoğraf kadar gerçek bir ada konaklaması.
            </h2>
          </div>
          <div className="prose-lite text-coast-ink/70">
            <p>{hotel?.aboutText}</p>
            <p>{hotel?.locationText}</p>
            <Button href="/hakkimizda" variant="ghost" className="px-0">
              Daha fazla oku <ArrowRight size={18} />
            </Button>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coast-clay">
                  Odalar
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold">Konforlu odalar</h2>
              </div>
              <Button href="/odalar" variant="secondary">
                Tüm Odalar
              </Button>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {rooms.map((room) => (
                <article key={room.id} className="overflow-hidden rounded-lg border border-coast-sage/20 bg-[#fbfaf6]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={room.images[0]?.imageUrl || hotel?.heroImageUrl || ""}
                      alt={room.images[0]?.altText || room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-2xl font-semibold">{room.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-coast-ink/65">{room.description}</p>
                    <p className="mt-4 text-sm font-semibold text-coast-deep">{room.viewType}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coast-clay">
                Hizmetler
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold">Konaklamayı kolaylaştıran detaylar</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.id} className="rounded-lg border border-coast-sage/20 bg-white p-5">
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-coast-ink/65">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-coast-mist py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-4xl font-semibold">Galeriden seçmeler</h2>
              <Button href="/galeri" variant="secondary">Galeriyi Aç</Button>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {gallery.map((image) => (
                <div key={image.id} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image src={image.imageUrl} alt={image.altText} fill className="object-cover transition duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <div className="rounded-lg bg-coast-deep p-8 text-white">
              <h2 className="font-serif text-4xl font-semibold">Bilgi almak ister misiniz?</h2>
              <p className="mt-4 leading-7 text-white/75">
                Oda özellikleri, ulaşım ve otel olanakları hakkında bize telefon, WhatsApp veya e-posta ile ulaşabilirsiniz.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {hotel?.phone && <Button href={`tel:${hotel.phone}`} variant="secondary"><Phone size={18} /> Hemen Ara</Button>}
                {hotel?.whatsapp && <Button href={`https://wa.me/${hotel.whatsapp.replace(/[^0-9]/g, "")}`} variant="secondary"><MessageCircle size={18} /> WhatsApp</Button>}
              </div>
            </div>
            <div className="rounded-lg border border-coast-sage/20 bg-white p-8">
              <h2 className="font-serif text-3xl font-semibold">Son duyurular</h2>
              <div className="mt-6 grid gap-5">
                {announcements.map((item) => (
                  <Link href={`/duyurular/${item.slug}`} key={item.id} className="group">
                    <p className="text-sm text-coast-clay">{item.date.toLocaleDateString("tr-TR")}</p>
                    <h3 className="mt-1 font-semibold group-hover:text-coast-clay">{item.title}</h3>
                    <p className="mt-1 text-sm text-coast-ink/65">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
