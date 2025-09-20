"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const pricingPackages = [
  {
    name: "Basic",
    price: "Rp 100.000",
    features: [
      "Responsive Mobile Friendly",
      "RSVP & Ucapan",
      "Galeri Foto & Video",
      "Navigasi Lokasi",
    ],
    color: "from-pink-100 to-purple-100",
  },
  {
    name: "Premium",
    price: "Rp 200.000",
    features: [
      "Semua fitur Basic",
      "Autoplay Backsound",
      "Elegant & Colorful Styles",
      "Story Love Timeline",
    ],
    color: "from-purple-100 to-indigo-100",
    popular: true,
  },
  {
    name: "Exclusive",
    price: "Rp 350.000",
    features: [
      "Semua fitur Premium",
      "Custom Nama Tamu",
      "Love Gift (Cashless)",
      "Support Prioritas 24/7",
    ],
    color: "from-pink-200 to-purple-200",
  },
];

export default function PricingSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, i) => {
        const row = Math.floor(i / 3);
        gsap.from(card, {
          opacity: 0,
          y: 80,
          rotateY: -90,
          duration: 1,
          ease: "back.out(1.7)",
          delay: row * 0.3,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }
  }, []);

  return (
    <section
      id="pricing"
      className="relative z-10 bg-gradient-to-b from-pink-50 to-purple-50 py-20"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Heading */}
        <div className="text-center">
          <h2 className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md">
            PILIH PAKET TERBAIKMU
          </h2>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Sesuaikan kebutuhan undangan digitalmu dengan paket yang kami
          sediakan.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pricingPackages.map((pkg, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`feature-card group relative rounded-2xl bg-gradient-to-br ${pkg.color} p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl`}
            >
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-1 text-xs font-semibold text-white shadow-md">
                  Paling Populer
                </span>
              )}

              <h3 className="text-2xl font-bold text-gray-800">{pkg.name}</h3>
              <p className="mt-4 text-4xl font-extrabold text-pink-600">
                {pkg.price}
              </p>

              <ul className="mt-6 space-y-3 text-left">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="mt-8 w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl">
                Pilih Paket
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
