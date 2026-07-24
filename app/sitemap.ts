import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/hakkimizda", changeFrequency: "monthly", priority: 0.7 },
  { path: "/odalar", changeFrequency: "weekly", priority: 0.9 },
  { path: "/galeri", changeFrequency: "weekly", priority: 0.8 },
  { path: "/hizmetler", changeFrequency: "monthly", priority: 0.7 },
  { path: "/etkinlik-takvimi", changeFrequency: "weekly", priority: 0.7 },
  { path: "/duyurular", changeFrequency: "weekly", priority: 0.8 },
  { path: "/gor-yap", changeFrequency: "monthly", priority: 0.7 },
  { path: "/iletisim", changeFrequency: "monthly", priority: 0.8 }
];

const confirmedAnnouncementSlugs = ["yaz-sezonu-duyurusu"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let announcements: Array<{ slug: string; updatedAt?: Date }> = [];

  try {
    announcements = await prisma.announcement.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" }
    });
  } catch {
    // Veritabanı geçici olarak erişilemezse doğrulanmış canlı duyuru kaybolmasın.
    announcements = confirmedAnnouncementSlugs.map((slug) => ({ slug }));
  }

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: getAbsoluteUrl(path),
      changeFrequency,
      priority
    })),
    ...announcements.map(({ slug, updatedAt }) => ({
      url: getAbsoluteUrl(`/duyurular/${slug}`),
      ...(updatedAt ? { lastModified: updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
