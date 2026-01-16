"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

const images: string[] = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
];

export default function Gallery() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="py-24 bg-white text-center overflow-hidden"
      >
        <h2 className="text-4xl text-black mb-12">Galeri Kenangan</h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-6">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(img)}
              className="gallery-item group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={img}
                alt="Gallery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <img
            src={active}
            alt="Preview"
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
