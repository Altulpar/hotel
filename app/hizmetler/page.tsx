import { Coffee, Sparkles, Wifi, Car, Utensils, Trees, Wind, Map } from "lucide-react";
import { prisma } from "@/lib/db";
import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";
import { PageHero } from "@/components/public/PageHero";

const icons = { Coffee, Sparkles, Wifi, Car, Utensils, Trees, Wind, Map };

export const metadata = { title: "Hizmetler" };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { status: "PUBLISHED" }, orderBy: { sortOrder: "asc" } });
  return (
    <>
      <PublicNav />
      <PageHero eyebrow="Hizmetler" title="Konaklamayı rahatlatan olanaklar." description="Kahvaltıdan Wi-Fi erişimine, günlük kat hizmetinden çevre önerilerine kadar otel olanakları." />
      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3 md:py-24">
        {services.map((service) => {
          const Icon = icons[service.icon as keyof typeof icons] || Sparkles;
          return (
            <article key={service.id} className="rounded-lg border border-coast-sage/20 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-coast-mist text-coast-deep">
                <Icon size={22} />
              </div>
              <h2 className="mt-5 font-serif text-2xl font-semibold">{service.title}</h2>
              <p className="mt-3 leading-7 text-coast-ink/65">{service.description}</p>
            </article>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
