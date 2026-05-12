"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

type PublicNavMenuProps = {
  navItems: NavItem[];
  desktopItems: NavItem[];
  phone?: string | null;
  email?: string | null;
  googleMapsUrl?: string | null;
};

export function PublicNavMenu({ navItems, desktopItems, phone, email, googleMapsUrl }: PublicNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-1 text-sm font-medium text-coast-ink lg:flex">
        {desktopItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 transition hover:bg-coast-mist hover:text-coast-deep"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-2 md:flex">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-coast-mist text-coast-deep transition hover:bg-coast-sage/20"
            aria-label="Telefon"
          >
            <Phone size={18} />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-coast-mist text-coast-deep transition hover:bg-coast-sage/20"
            aria-label="E-posta"
          >
            <Mail size={18} />
          </a>
        )}
        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-coast-deep text-white transition hover:bg-coast-ink"
            aria-label="Yol tarifi"
          >
            <MapPin size={18} />
          </a>
        )}
      </div>

      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-coast-sage/25 bg-white text-coast-deep shadow-sm lg:hidden"
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full border-t border-coast-sage/15 bg-[#fbfaf6] shadow-soft lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 text-base font-medium text-coast-ink">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 transition hover:bg-coast-mist"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mx-auto flex max-w-7xl gap-2 border-t border-coast-sage/10 px-4 py-4">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-coast-mist text-sm font-semibold text-coast-deep"
                onClick={() => setIsOpen(false)}
              >
                <Phone size={17} />
                Ara
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-coast-mist text-sm font-semibold text-coast-deep"
                onClick={() => setIsOpen(false)}
              >
                <Mail size={17} />
                E-posta
              </a>
            )}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-coast-deep text-sm font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                <MapPin size={17} />
                Yol
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
