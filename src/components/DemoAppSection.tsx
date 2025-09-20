"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const demos = [
  {
    title: "Undangan Elegant",
    image: "https://source.unsplash.com/400x600/?wedding,elegant",
    link: "#",
  },
  {
    title: "Undangan Modern",
    image: "https://source.unsplash.com/400x600/?wedding,modern",
    link: "#",
  },
  {
    title: "Undangan Floral",
    image: "https://source.unsplash.com/400x600/?wedding,flowers",
    link: "#",
  },
  {
    title: "Undangan Classic",
    image: "https://source.unsplash.com/400x600/?wedding,classic",
    link: "#",
  },
];

export default function DemoAppSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".demo-card");
      gsap.set(cards, { transformPerspective: 1000 });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 70, rotateY: -90 },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.2,
            }
          );
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative z-10 bg-gradient-to-b from-pink-50 to-purple-50 py-24"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Heading */}
        <h2 className="mx-auto inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md">
          DEMO APLIKASI
        </h2>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Pilih salah satu contoh undangan digital berikut untuk melihat demo
          langsung.
        </p>

        {/* Grid of cards */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {demos.map((demo, i) => (
            <div
              key={i}
              className="demo-card group relative overflow-hidden rounded-2xl bg-white/90 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <img
                src={demo.image}
                alt={demo.title}
                className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <h3 className="text-xl font-semibold">{demo.title}</h3>
                <a
                  href={demo.link}
                  target="_blank"
                  className="mt-3 inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105"
                >
                  Lihat Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
