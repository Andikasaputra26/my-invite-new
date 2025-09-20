"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PromoSection() {
  const bannerRef = useRef(null);

  useEffect(() => {
    gsap.to(bannerRef.current, {
      opacity: 0.8,
      duration: 1.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section className="bg-pink-600 py-16 text-center text-white">
      <div className="container mx-auto px-4">
        <h2 ref={bannerRef} className="text-3xl font-bold md:text-5xl">
          Promo September! Diskon 20% untuk Paket Premium & Exclusive.
        </h2>
      </div>
    </section>
  );
}
