"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTimes, FaExpand, FaMobileAlt } from "react-icons/fa";

const demos = [
  {
    title: "Undangan Elegant",
    image: "https://source.unsplash.com/400x600/?wedding,elegant",
    link: "/invitation",
    description: "Desain mewah dengan sentuhan klasik",
  },
  {
    title: "Undangan Modern",
    image: "https://source.unsplash.com/400x600/?wedding,modern",
    link: "https://invite-marry.vercel.app/",
    description: "Tampilan modern dan minimalis",
  },
  {
    title: "Undangan Floral",
    image: "https://inwedding.vercel.app/",
    link: "https://inwedding.vercel.app/",
    description: "Nuansa bunga yang romantis",
  },
  {
    title: "Undangan Classic",
    image: "https://source.unsplash.com/400x600/?wedding,classic",
    link: "#",
    description: "Gaya klasik yang timeless",
  },
];

export default function DemoAppSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<typeof demos[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleOpenModal = (demo: typeof demos[0]) => {
    if (demo.link === "#") return;
    setSelectedDemo(demo);
    setShowModal(true);
    setIsLoading(true);
  };

  const handleGoPage = () => {
    setShowModal(false);
    if (selectedDemo?.link) {
      if (selectedDemo.link.startsWith("http")) {
        window.open(selectedDemo.link, "_blank");
      } else {
        router.push(selectedDemo.link);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDemo(null);
    setIsLoading(true);
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
              <div className="relative h-96 w-full">
                <Image
                  src={demo.image}
                  alt={demo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <h3 className="text-xl font-semibold">{demo.title}</h3>
                <p className="text-sm text-white/80 mt-1">{demo.description}</p>
                <button
                  onClick={() => handleOpenModal(demo)}
                  className="mt-3 inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-300 cursor-pointer hover:scale-105"
                >
                  Lihat Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Modal */}
      {showModal && selectedDemo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full h-full max-w-7xl mx-auto p-4 md:p-8 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 group"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6 w-full h-full max-h-[90vh]">
              {/* Left Side - Info Panel */}
              <div className="lg:w-1/3 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold mb-4">
                    PREVIEW DEMO
                  </div>
                  
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    {selectedDemo.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {selectedDemo.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
                      <span>Responsive Design</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
                      <span>Animasi Smooth</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
                      <span>Musik Latar</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
                      <span>Galeri Foto</span>
                    </div>
                  </div>

                  {/* Device Info */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
                    <FaMobileAlt />
                    <span>Optimized for Mobile</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-8">
                  <button
                    onClick={handleGoPage}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <FaExpand className="text-sm" />
                    <span>Buka Halaman Penuh</span>
                  </button>
                  
                  <button
                    onClick={handleCloseModal}
                    className="w-full px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  >
                    Tutup Preview
                  </button>
                </div>
              </div>

              {/* Right Side - iPhone Mockup */}
              <div className="lg:w-2/3 flex items-center justify-center">
                <div className="relative">
                  {/* iPhone Frame */}
                  <div className="relative mx-auto" style={{ width: "375px", height: "812px" }}>
                    {/* Outer Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[3rem] shadow-2xl"></div>
                    
                    {/* Screen Container */}
                    <div className="absolute inset-3 bg-black rounded-[2.5rem] overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10 shadow-lg"></div>
                      
                      {/* Camera & Sensors */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                        <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                        <div className="w-12 h-2 rounded-full bg-gray-900"></div>
                      </div>

                      {/* Loading Overlay */}
                      {isLoading && (
                        <div className="absolute inset-0 bg-white z-20 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-600 font-medium">Loading demo...</p>
                          </div>
                        </div>
                      )}

                      {/* iFrame */}
                      <iframe
                        src={selectedDemo.link}
                        title="Preview Demo"
                        className="w-full h-full bg-white"
                        onLoad={() => setIsLoading(false)}
                      />
                    </div>

                    {/* Side Buttons */}
                    <div className="absolute left-0 top-32 w-1 h-12 bg-gray-700 rounded-r-lg"></div>
                    <div className="absolute left-0 top-48 w-1 h-16 bg-gray-700 rounded-r-lg"></div>
                    <div className="absolute left-0 top-68 w-1 h-16 bg-gray-700 rounded-r-lg"></div>
                    <div className="absolute right-0 top-48 w-1 h-24 bg-gray-700 rounded-l-lg"></div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-[3rem] blur-3xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}