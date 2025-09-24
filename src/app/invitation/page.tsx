"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Countdown from "@/components/invite/Countdown";

export default function InvitationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animasi overlay saat halaman dimuat
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
        delay: 0.2,
      });
    }

    // Animasi hero section masuk
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.8, // muncul setelah overlay keluar
        }
      );
    }
  }, []);

  return (
    <main className="relative bg-gradient-to-b from-pink-100 to-white text-gray-800 overflow-hidden">
      {/* Overlay Transition */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600"
      />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center items-center text-center bg-[url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Andi & Citra</h1>
          <p className="text-lg md:text-2xl">Akan melangsungkan pernikahan</p>
          <p className="mt-6 text-xl">12 Desember 2025</p>
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-16 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Mempelai</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <img
              src="https://i.pravatar.cc/200?img=5"
              alt="Andi"
              className="w-40 h-40 rounded-full shadow-lg mb-4"
            />
            <h3 className="text-2xl font-semibold">Andi Saputra</h3>
            <p className="text-gray-600">Putra dari Bapak Saputra & Ibu Dewi</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://i.pravatar.cc/200?img=6"
              alt="Citra"
              className="w-40 h-40 rounded-full shadow-lg mb-4"
            />
            <h3 className="text-2xl font-semibold">Citra Dewi</h3>
            <p className="text-gray-600">Putri dari Bapak Hadi & Ibu Sari</p>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 bg-pink-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Hitung Mundur Acara</h2>
        <Countdown targetDate="2025-12-12T09:00:00" />
      </section>

      {/* Event Detail */}
      <section className="py-16 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Detail Acara</h2>
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <p className="text-xl font-semibold mb-2">Akad Nikah</p>
          <p>12 Desember 2025 | 09:00 WIB</p>
          <p className="mt-4 text-xl font-semibold mb-2">Resepsi</p>
          <p>12 Desember 2025 | 11:00 WIB</p>
          <p className="mt-6">Jl. Merpati No. 123, Jakarta</p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 text-center bg-pink-200">
        <h2 className="text-3xl font-bold mb-6">Terima Kasih</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
      </section>
    </main>
  );
}
