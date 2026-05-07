import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Ada Ruhu Otel | Butik Otel",
    template: "%s | Ada Ruhu Otel"
  },
  description:
    "Modern, sakin ve fotoğraf odaklı butik otel tanıtım sitesi. Odalar, galeri, hizmetler, etkinlikler ve iletişim bilgileri.",
  metadataBase: new URL("https://example.com")
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
