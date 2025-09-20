"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { gsap } from "gsap";

const steps = [
  {
    title: "Pesan Undangan Digital",
    content: [
      "Pilih template undangan yang diinginkan. Untuk melihat demo katalog silahkan klik bagian halaman katalog.",
      "Untuk melihat halaman tampilan demo, silahkan klik tombol “Lihat Demo”, dan catat nomor demo yang diinginkan.",
      "Setelah memilih tema undangan, Anda bisa melakukan pemesanan dengan langsung klik pada tombol halaman pembelian.",
      "Isi form yang disediakan, lalu lakukan pembayaran sesuai dengan pilihan metode pembayaran yang tersedia.",
    ],
  },
  {
    title: "Proses Pengerjaan Orderan",
    content: [
      "Lakukan pembayaran sesuai paket yang dipilih terlebih dahulu untuk memulai pengerjaan.",
      "Pembayaran dilakukan full payment via transfer ke rekening resmi kami yang tertera pada halaman pembayaran & konfirmasi.",
      "Pastikan melakukan konfirmasi pembayaran untuk mempercepat proses pengerjaan.",
      "Estimasi pengerjaan maksimal 2 x 24 jam setelah konfirmasi pembayaran diterima.",
    ],
  },
  {
    title: "Butuh Bantuan / Konsultasi Terlebih Dahulu?",
    content: [
      "Jika mengalami kesulitan dalam pemesanan jasa undangan digital, silahkan hubungi kami melalui chat support WhatsApp: +62 812 3456 78xx",
      "Kami akan dengan senang hati siap membantu Anda.",
    ],
  },
];

export default function MakeOrder() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set awal
  useEffect(() => {
    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.set(ref, {
          height: i === openIndex ? "auto" : 0,
          opacity: i === openIndex ? 1 : 0,
        });
      }
    });
  }, []);

  // Animasi buka/tutup
  useEffect(() => {
    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.to(ref, {
          height: i === openIndex ? "auto" : 0,
          opacity: i === openIndex ? 1 : 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  }, [openIndex]);

  return (
    <section className="relative z-10 bg-gradient-to-b from-pink-50 to-purple-50 py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Heading */}
        <h2 className="mx-auto block w-fit rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md">
          CARA ORDER UNDANGAN DIGITAL
        </h2>

        <p className="mt-4 text-center text-lg font-medium text-gray-700">
          Kami siap membantu Anda membagikan momen bahagia dengan cara yang
          lebih mudah dan profesional. Ikuti langkah-langkah berikut untuk
          melakukan pemesanan.
        </p>

        {/* Accordion */}
        <div className="mt-12 space-y-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white/90 shadow-md transition hover:shadow-lg"
            >
              {/* Header */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-gray-800"
              >
                <span className="text-base md:text-lg">{step.title}</span>
                {openIndex === i ? (
                  <ChevronUp className="h-6 w-6 text-pink-600 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-500 transition-transform duration-300" />
                )}
              </button>

              {/* Content */}
              <div
                ref={(el) => {
                  if (el) contentRefs.current[i] = el;
                }}
                className="overflow-hidden px-6"
              >
                <ul className="list-disc space-y-2 pb-5 pl-6 text-sm text-gray-600 md:text-base">
                  {step.content.map((text, j) => (
                    <li key={j}>{text}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
