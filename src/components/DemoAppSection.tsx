"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/navigation";
import Image from "next/image";

const demos = [
  {
    title: "Undangan Elegant",
    image: "https://source.unsplash.com/400x600/?wedding,elegant",
    link: "/invitation",
  },
  {
    title: "Undangan Modern",
    image: "https://source.unsplash.com/400x600/?wedding,modern",
    link: "https://invite-marry.vercel.app/",
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
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string>("");

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

  const handleOpenModal = (link: string) => {
    if (link === "#") return;
    setSelectedLink(link);
    setShowModal(true);
  };

  const handleGoPage = () => {
    setShowModal(false);
    if (selectedLink) {
      router.push(selectedLink);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative z-10 bg-gradient-to-b from-pink-50 to-purple-50 py-24"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mx-auto inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md">
          DEMO APLIKASI
        </h2>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Pilih salah satu contoh undangan digital berikut untuk melihat demo
          langsung.
        </p>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {demos.map((demo, i) => (
            <div
              key={i}
              className="demo-card group relative overflow-hidden rounded-2xl bg-white/90 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <Image
                src={demo.image}
                alt={demo.title}
                className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <h3 className="text-xl font-semibold">{demo.title}</h3>
                <button
                  onClick={() => handleOpenModal(demo.link)}
                  className="mt-3 inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-300 cursor-pointer hover:scale-105"
                >
                  Lihat Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] h-[90%] flex flex-col items-center justify-center">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b w-full">
              <h3 className="text-lg font-semibold text-gray-800">
                Preview Demo
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Smartphone frame */}
            <div className="flex-1 flex items-center justify-center bg-gray-100">
              <div
                className="relative bg-black rounded-[2.5rem] shadow-2xl p-4"
                style={{ width: "375px", height: "812px" }}
              >
                {/* notch / kamera */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl"></div>

                {/* iframe konten */}
                <iframe
                  src={selectedLink}
                  title="Preview Demo"
                  className="w-full h-full rounded-[2rem] bg-white"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t w-full flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Tutup
              </button>
              <button
                onClick={handleGoPage}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
              >
                Buka Halaman Penuh
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
