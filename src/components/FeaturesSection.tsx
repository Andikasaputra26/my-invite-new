"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Smartphone,
  Palette,
  User,
  Music,
  Image,
  MessageCircle,
  MapPin,
  Gift,
  Quote,
  Clock,
  BookOpen,
  Send,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Responsive Mobile Friendly",
    desc: "Tampil dinamis di semua perangkat gadget (desktop / tablet / mobile phone).",
  },
  {
    icon: Palette,
    title: "Elegant & Colorful Styles",
    desc: "Tersedia beragam pilihan aneka template undangan digital yang menarik & kekinian.",
  },
  {
    icon: User,
    title: "Custom Nama Tamu",
    desc: "Sebarkan undanganmu lebih personal dengan nama tamu undangan (unlimited).",
  },
  {
    icon: Music,
    title: "Autoplay Backsound",
    desc: "Tambahkan musik untuk memberi kesan romantis.",
  },
  {
    icon: Image,
    title: "Galeri Foto & Video",
    desc: "Bagikan momen bahagiamu dalam bentuk foto ataupun video.",
  },
  {
    icon: MessageCircle,
    title: "RSVP & Ucapan",
    desc: "Terima ucapan dan doa secara langsung dari tamu undangan.",
  },
  {
    icon: MapPin,
    title: "Navigasi Lokasi",
    desc: "Berikan kemudahan kepada tamu anda untuk mencari lokasi.",
  },
  {
    icon: Gift,
    title: "Love Gift",
    desc: "Kirimkan tanda kasih secara cashless dengan mudah.",
  },
  {
    icon: Quote,
    title: "Kutipan Ayat Atau Quote",
    desc: "Tambahkan kata mutiara ataupun kutipan ayat kitab suci.",
  },
  {
    icon: Clock,
    title: "Countdown Wedding",
    desc: "Berikan hitung mundur acara untuk mengingatkan tamu.",
  },
  {
    icon: BookOpen,
    title: "Story Love Timeline",
    desc: "Bagikan kisah perjalanan cinta kalian hingga ke pelaminan.",
  },
  {
    icon: Send,
    title: "Sender Tools",
    desc: "Kirimkan undangan digital jadi lebih mudah dan cepat.",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".feature-card");

      // set perspective biar 3D nyata
      gsap.set(cards, { transformPerspective: 1000 });

      // kelompokkan per row (3 kolom → setiap row punya 3 card)
      const rows: HTMLElement[][] = [];
      cards.forEach((card, i) => {
        const rowIndex = Math.floor(i / 3);
        if (!rows[rowIndex]) rows[rowIndex] = [];
        rows[rowIndex].push(card as HTMLElement);
      });

      // kasih animasi berbeda per row
      rows.forEach((row, i) => {
        let fromVars: gsap.TweenVars = { opacity: 0, y: 50, rotateY: -90 };
        if (i % 3 === 1) {
          fromVars = { opacity: 0, y: 50, rotateY: 90 }; // row kedua flip kanan
        } else if (i % 3 === 2) {
          fromVars = { opacity: 0, y: 80, rotateX: 90 }; // row ketiga flip bawah
        }

        gsap.fromTo(row, fromVars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: row[0],
            start: "top 85%",
            once: true,
          },
        });
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative z-10 bg-gradient-to-b from-pink-50 to-purple-50 py-20"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Heading */}
        <h2 className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md">
          KEUNGGULAN LAYANAN JASA KAMI
        </h2>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Temukan Fitur-Fitur Menarik Yang Akan Membuat Undangan Pernikahan Anda
          Tampil Beda.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, i) => (
            <div
              key={i}
              className="feature-card group rounded-xl bg-white/90 p-6 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-100 to-purple-100 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <feat.icon className="h-7 w-7 text-pink-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
