"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

type TestimonialItem = {
  name: string;
  role: string;
  message: string;
  avatar: string;
};

const testimonials: TestimonialItem[] = [
  {
    name: "Andi Saputra",
    role: "Product Manager",
    message:
      "Layanan ini benar-benar membantu tim kami berkembang lebih cepat. Animasi halus membuat presentasi semakin hidup.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Budi Santoso",
    role: "UI/UX Designer",
    message:
      "UI/UX terasa sangat estetik, responsif, dan interaktif. Memberikan pengalaman pengguna yang luar biasa.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Citra Dewi",
    role: "Software Engineer",
    message:
      "Integrasi dengan Next.js dan GSAP berjalan mulus. Performanya ringan meski efek 3D digunakan.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

export default function TestimonialSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotateY: -30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.3,
            ease: "power3.out",
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Apa Kata Mereka
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1200px]">
          {testimonials.map((item, i) => (
           <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform duration-500 transform-gpu hover:rotate-y-6 hover:translate-z-4 hover:scale-105"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={item.avatar}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-full mb-4 border-4 border-white/20 shadow-lg object-cover"
              />
              <p className="text-lg italic mb-4">&quot;{item.message}&quot;</p>
              <h3 className="font-semibold text-xl">{item.name}</h3>
              <span className="text-sm text-gray-400">{item.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
