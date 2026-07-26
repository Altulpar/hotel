import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Fiore Otel | Gökçeada Otel",
    template: "%s | Fiore Otel"
  },
  description:
    "Modern, sakin ve fotoğraf odaklı Gökçeada oteli. Odalar, galeri, hizmetler, etkinlikler ve iletişim bilgileri.",
  metadataBase: new URL(SITE_URL)
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
