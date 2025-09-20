"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const testimonials = [
  {
    name: "Sarah & Ben",
    text: "Sangat puas dengan hasilnya! Undangan terlihat profesional dan elegan.",
  },
  {
    name: "Ryan & Lisa",
    text: "Fitur RSVP sangat membantu, kami jadi lebih mudah mengelola tamu.",
  },
  {
    name: "David & Amanda",
    text: "Desainnya modern, dan semua fitur berfungsi dengan baik. Terima kasih!",
  },
  {
    name: "Nadia & Ali",
    text: "Prosesnya cepat dan pelayanannya ramah. Sangat direkomendasikan!",
  },
  {
    name: "Rina & Fajar",
    text: "Musiknya bikin undangan terasa lebih hidup. Tamu-tamu juga kagum!",
  },
  {
    name: "Andi & Maya",
    text: "Harga sesuai, fitur lengkap, hasil sangat memuaskan.",
  },
];

export default function TestimonialSection() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sliderRef.current && containerRef.current) {
      const cards = sliderRef.current.querySelectorAll(".testimonial-card");

      // animasi saat masuk viewport
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        rotateY: -15,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // auto-scroll loop
      const totalWidth =
        sliderRef.current.scrollWidth - containerRef.current.clientWidth;

      tweenRef.current = gsap.to(sliderRef.current, {
        x: -totalWidth,
        duration: 35,
        ease: "linear",
        repeat: -1,
      });

      // pause/resume on hover
      containerRef.current.addEventListener("mouseenter", () =>
        tweenRef.current?.pause()
      );
      containerRef.current.addEventListener("mouseleave", () =>
        tweenRef.current?.resume()
      );
    }
  }, []);

  return (
    <section className="relative z-10 bg-gradient-to-b from-purple-50 to-pink-50 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Heading */}
        <h2 className="mx-auto inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md">
          KATA MEREKA
        </h2>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Beberapa pengalaman pasangan yang sudah menggunakan layanan undangan
          digital kami.
        </p>

        {/* Slider */}
        <div
          ref={containerRef}
          className="mt-12 overflow-hidden rounded-xl border border-gray-200 bg-white/70 p-4 shadow-inner"
        >
          <div
            ref={sliderRef}
            className="flex gap-8"
            style={{ willChange: "transform" }}
          >
            {testimonials.map((testi, index) => (
              <div
                key={index}
                className="testimonial-card w-[280px] flex-shrink-0 rounded-xl bg-white/90 p-6 text-left shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <p className="text-gray-600 italic leading-relaxed">
                  “{testi.text}”
                </p>
                <p className="mt-4 font-semibold text-gray-800">
                  — {testi.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
