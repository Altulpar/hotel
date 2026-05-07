import Image from "next/image";
import { prisma } from "@/lib/db";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";

export const dynamic = "force-dynamic";

export const metadata = { title: "Hakkımızda" };

export default async function AboutPage() {
  const hotel = await prisma.hotelInfo.findFirst();
  return (
    <>
      <PublicNav />
      <PageHero
        eyebrow="Hakkımızda"
        title="Ada hayatının sakin ritmine uyumlanan butik otel."
        description={hotel?.slogan || ""}
      />
      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1fr_1fr] md:py-24">
        <div className="relative min-h-[420px] overflow-hidden rounded-lg">
          <Image
            src={hotel?.heroImageUrl || "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1800&q=80"}
            alt={`${hotel?.hotelName || "Otel"} atmosferi`}
            fill
            className="object-cover"
          />
        </div>
        <div className="prose-lite text-lg text-coast-ink/75">
          <p>{hotel?.aboutText}</p>
          <p>{hotel?.locationText}</p>
          <p>
            Tasarımda sadelik, odalarda ferahlık ve ortak alanlarda sıcak bir karşılama hissi
            ön plandadır. Amacımız, misafirlerimizin adayı kendi hızında keşfedebileceği
            dingin bir başlangıç noktası sunmaktır.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
