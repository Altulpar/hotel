import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const announcement = await prisma.announcement.findUnique({ where: { slug } });
  return { title: announcement?.title || "Duyuru" };
}

export default async function AnnouncementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const announcement = await prisma.announcement.findUnique({ where: { slug } });
  if (!announcement || announcement.status !== "PUBLISHED") notFound();
  return (
    <>
      <PublicNav />
      <main className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coast-clay">
          {formatDate(announcement.date)}
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold">{announcement.title}</h1>
        <p className="mt-5 text-xl leading-8 text-coast-ink/65">{announcement.summary}</p>
        {announcement.imageUrl && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg">
            <Image src={announcement.imageUrl} alt={announcement.title} fill className="object-cover" />
          </div>
        )}
        <div className="prose-lite mt-10 text-lg text-coast-ink/75">
          {announcement.content.split("\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
