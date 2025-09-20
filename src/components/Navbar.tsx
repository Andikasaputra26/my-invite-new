"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = ["Home", "Fitur", "Paket", "Promo", "Kontak"];

  // Scroll effect → ubah background navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll saat menu mobile terbuka + ESC untuk menutup
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    }
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Tutup menu jika resize ke desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // GSAP animasi overlay & item menu
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power1.out" }
      );
      gsap.fromTo(
        menuRef.current.querySelectorAll("a"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* =============== LOGO =============== */}
        <Link
          href="/"
          className="font-serif text-3xl font-bold tracking-wide text-pink-600"
        >
          <span className="font-[Great_Vibes] text-4xl text-purple-600">
            Undangan
          </span>{" "}
          Digital
        </Link>

        {/* =============== MENU DESKTOP =============== */}
        <div className="hidden gap-8 font-medium text-gray-700 md:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative"
            >
              <span className="transition-colors group-hover:text-pink-600">
                {item}
              </span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-pink-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* =============== CTA DESKTOP =============== */}
        <div className="hidden md:block">
          <Link
            href="#pesan"
            className="rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-2 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            Pesan Sekarang
          </Link>
        </div>

        {/* =============== HAMBURGER MOBILE =============== */}
        <button
          aria-label="Buka menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md"
        >
          <button
            aria-label="Tutup menu"
            className="absolute right-4 top-4 rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
            <span className="sr-only">Tutup</span>
          </button>

          <div className="flex h-full flex-col items-center justify-center gap-8 text-xl font-medium text-gray-700">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="transition hover:text-pink-600"
              >
                {item}
              </Link>
            ))}
            <Link
              href="#pesan"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Pesan Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
