import Link from "next/link";
import { ReactNode } from "react";
import { adminLogoutAction } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

const adminLinks = [
  ["Genel Bakış", "/admin"],
  ["Otel Bilgileri", "/admin/settings"],
  ["Odalar", "/admin/rooms"],
  ["Galeri", "/admin/gallery"],
  ["Hizmetler", "/admin/services"],
  ["Takvim", "/admin/calendar"],
  ["Duyurular", "/admin/announcements"],
  ["Gör & Yap", "/admin/nearby"],
  ["Mesajlar", "/admin/messages"]
];

export function AdminShell({ children, adminName }: { children: ReactNode; adminName: string }) {
  return (
    <div className="min-h-screen bg-coast-mist">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-coast-sage/20 bg-white p-6 lg:block">
        <Link href="/admin" className="font-serif text-2xl font-semibold text-coast-deep">
          Otel Paneli
        </Link>
        <nav className="mt-8 grid gap-2">
          {adminLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-2 text-sm font-medium text-coast-ink hover:bg-coast-mist"
            >
              {label}
            </Link>
          ))}
        </nav>
        <form action={adminLogoutAction} className="absolute bottom-6 left-6 right-6">
          <Button type="submit" variant="secondary" className="w-full">
            Çıkış Yap
          </Button>
        </form>
      </aside>
      <main className="lg:pl-72">
        <div className="border-b border-coast-sage/20 bg-white px-4 py-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-coast-ink/60">Hoş geldiniz</p>
              <p className="font-semibold text-coast-ink">{adminName}</p>
            </div>
            <Link href="/" className="text-sm font-semibold text-coast-deep">
              Siteyi Gör
            </Link>
          </div>
          <nav className="mt-4 flex gap-3 overflow-x-auto text-sm lg:hidden">
            {adminLinks.map(([label, href]) => (
              <Link key={href} href={href} className="shrink-0 rounded-md bg-coast-mist px-3 py-2">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
