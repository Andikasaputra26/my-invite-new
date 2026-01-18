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

const items = [
  {
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200",
    video: "https://media.w3.org/2010/05/bunny/trailer.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    video: "https://media.w3.org/2010/05/video/movie_300.mp4",
  },
];


export default function Gallery() {
  const ref = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [active, setActive] = useState<null | { img: string; video: string }>(
    null
  );

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Animasi judul
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });

      // Animasi item gallery
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
      <section ref={ref} className="py-24 bg-white text-center overflow-hidden">
        <h2
          ref={titleRef}
          className="text-4xl text-black mb-12"
        >
          Galeri Kenangan
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[140px] gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-6 [grid-auto-flow:dense]">
          {items.map((item, i) => {
            const variant =
              i % 7 === 0
                ? "col-span-2 row-span-2"
                : i % 5 === 0
                ? "row-span-2"
                : i % 3 === 0
                ? "col-span-2"
                : "";

            return (
              <div
                key={i}
                onClick={() => setActive(item)}
                className={`gallery-item group relative ${variant} rounded-2xl overflow-hidden shadow-lg cursor-pointer`}
              >
                <img
                  src={item.img}
                  alt="Gallery"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
              </div>
            );
          })}
        </div>
      </section>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <video
            key={active.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={active.video} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <img
            src={active.img}
            alt="Preview"
            className="relative z-10 max-w-full max-h-full rounded-2xl shadow-2xl animate-[zoomIn_.4s_ease-out]"
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes zoomIn {
          from {
            transform: scale(0.85);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
