"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

type RoomImage = {
  id: string;
  imageUrl: string;
  altText: string;
};

const FALLBACK_IMAGE: RoomImage = {
  id: "fallback",
  imageUrl:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
  altText: "Otel odası"
};

export function RoomCarousel({
  images,
  roomName
}: {
  images: RoomImage[];
  roomName: string;
}) {
  const slides = images.length ? images : [FALLBACK_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const hasMultipleImages = slides.length > 1;

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 50) return;
    if (distance > 0) showPrevious();
    else showNext();
  }

  const activeImage = slides[activeIndex];

  return (
    <div
      className="group relative min-h-[320px] overflow-hidden bg-coast-mist outline-none md:min-h-full"
      role="region"
      aria-label={`${roomName} fotoğraf galerisi`}
      tabIndex={hasMultipleImages ? 0 : -1}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        key={activeImage.id}
        src={activeImage.imageUrl}
        alt={activeImage.altText || roomName}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />

      {hasMultipleImages && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15" />
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Önceki görsel"
            className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/35 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Sonraki görsel"
            className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/35 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-2 shadow-lg backdrop-blur-md">
            {slides.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${index + 1}. görseli göster`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                  index === activeIndex
                    ? "w-6 bg-white"
                    : "w-2 bg-white/55 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {activeIndex + 1} / {slides.length}
          </span>
        </>
      )}
    </div>
  );
}
