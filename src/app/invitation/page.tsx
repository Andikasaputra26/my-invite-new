"use client";

import ThreeScene from "@/components/invite/ThreeScene";

export default function InvitationPage() {
  return (
    <main className="relative bg-gradient-to-b from-pink-100 to-white text-gray-800 overflow-hidden">
      {/* Hero dengan Canvas 3D */}
      <section className="relative h-screen w-full">
        <ThreeScene />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            Andi & Citra
          </h1>
          <p className="text-lg md:text-2xl">Akan melangsungkan pernikahan</p>
          <p className="mt-6 text-xl">12 Desember 2025</p>
        </div>
      </section>

      {/* Detail Acara */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Detail Acara</h2>
        <p>12 Desember 2025 | Jakarta</p>
      </section>
    </main>
  );
}
