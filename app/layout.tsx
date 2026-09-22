import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Ad Otelcilik Fiore Gökçeada",
    template: "%s | Ad Otelcilik Fiore Gökçeada"
  },
  description:
    "Modern, sakin ve fotoğraf odaklı Gökçeada oteli. Odalar, galeri, hizmetler, etkinlikler ve iletişim bilgileri.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: {
      url: "/favicon.png",
      type: "image/png",
      sizes: "512x512"
    },
    apple: {
      url: "/apple-icon.png",
      type: "image/png",
      sizes: "180x180"
    }
  }
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
