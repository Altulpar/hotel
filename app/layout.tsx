import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_URL, getAbsoluteUrl } from "@/lib/site";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description:
    "Modern, sakin ve fotoğraf odaklı Gökçeada oteli. Odalar, galeri, hizmetler, etkinlikler ve iletişim bilgileri.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Modern, sakin ve fotoğraf odaklı Gökçeada oteli. Odalar, galeri, hizmetler, etkinlikler ve iletişim bilgileri."
  },
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
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["Fiore Gökçeada", "adotelcilikfioregokceada.com"],
    url: getAbsoluteUrl("/")
  };

  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
