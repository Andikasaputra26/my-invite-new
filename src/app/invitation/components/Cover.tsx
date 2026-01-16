"use client";

import { useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "../lib/gsap";

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const params = useSearchParams();
  const guest = params.get("to") || params.get("name") || "Bapak/Ibu/Saudara/i";
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const root = ref.current!;

      const bg = root.querySelector(".cover-bg");
      const card = root.querySelector(".cover-card");
      const labels = root.querySelectorAll(
        ".cover-label, .guest-label, .guest-location"
      );
      const chars = root.querySelectorAll(".cover-title .char");
      const dividers = root.querySelectorAll(".divider");
      const photo = root.querySelector(".cover-photo img");
      const frame = root.querySelector(".photo-frame");
      const guestName = root.querySelector(".guest-name");
      const button = root.querySelector(".open-button");
      const corners = root.querySelectorAll(".corner-decoration");

      // Initial state
      gsap.set(bg, { scale: 1.2, opacity: 0 });
      gsap.set(card, { y: 100, opacity: 0, scale: 0.9, rotationX: -15 });
      gsap.set(labels, { y: 30, opacity: 0 });
      gsap.set(chars, { y: 50, opacity: 0, rotationX: -90 });
      gsap.set(dividers, { scaleX: 0, opacity: 0 });
      gsap.set(frame, { scale: 0.8, opacity: 0, rotation: -5 });
      gsap.set(photo, { scale: 1.3, opacity: 0 });
      gsap.set(guestName, { y: 30, opacity: 0, scale: 0.95 });
      gsap.set(button, { y: 40, opacity: 0, scale: 0.8 });
      gsap.set(corners, { scale: 0, opacity: 0 });

      // Main timeline
      const tl = gsap.timeline();

      tl.to(bg, { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out" })
        .to(
          card,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .to(
          corners,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .to(
          labels[0],
          { y: 0, opacity: 0.7, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          chars,
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.025,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          dividers[0],
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          frame,
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.6"
        )
        .to(
          photo,
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1"
        )
        .to(
          dividers[1],
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          labels[1],
          { y: 0, opacity: 0.7, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .to(
          guestName,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        .to(
          labels[2],
          { y: 0, opacity: 0.7, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          button,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.2"
        )
        .to(
          button,
          {
            y: -8,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          "+=0.2"
        );

      // Subtle parallax for background
      gsap.to(bg, {
        backgroundPosition: "50% 55%",
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Shimmer effect for card
      gsap.to(card, {
        boxShadow:
          "0 30px 60px -30px rgba(15,23,42,0.8), 0 0 50px rgba(148,163,184,0.15)",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={ref}
      className="cover-bg fixed inset-0 z-50 flex items-center justify-center
        bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.96)),url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200')]
        bg-cover bg-center px-4 sm:px-6"
    >
      {/* Main Card */}
      <div className="cover-card relative text-center text-slate-100 backdrop-blur-xl 
        bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-900/50 
        border border-slate-400/30 rounded-3xl sm:rounded-[3rem] 
        p-6 sm:p-8 md:p-12 
        shadow-[0_30px_60px_-30px_rgba(15,23,42,0.8)] 
        w-full max-w-[340px] sm:max-w-md md:max-w-lg">
        
        {/* Corner Decorations */}
        <div className="corner-decoration absolute top-3 left-3 sm:top-4 sm:left-4 
          w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
          border-l-2 border-t-2 border-slate-400/30 rounded-tl-xl sm:rounded-tl-2xl" />
        <div className="corner-decoration absolute top-3 right-3 sm:top-4 sm:right-4 
          w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
          border-r-2 border-t-2 border-slate-400/30 rounded-tr-xl sm:rounded-tr-2xl" />
        <div className="corner-decoration absolute bottom-3 left-3 sm:bottom-4 sm:left-4 
          w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
          border-l-2 border-b-2 border-slate-400/30 rounded-bl-xl sm:rounded-bl-2xl" />
        <div className="corner-decoration absolute bottom-3 right-3 sm:bottom-4 sm:right-4 
          w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
          border-r-2 border-b-2 border-slate-400/30 rounded-br-xl sm:rounded-br-2xl" />

        {/* Label */}
        <p className="cover-label tracking-[4px] sm:tracking-[6px] 
          text-[10px] sm:text-xs uppercase opacity-70 mb-2 font-light">
          The Wedding Of
        </p>

        {/* Title */}
        <h1 className="cover-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
          font-bold my-4 sm:my-5 md:my-6 tracking-wide 
          bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 
          bg-clip-text text-transparent leading-tight">
          {splitText("Risky Santoso & Nisa Wardani")}
        </h1>

        {/* Divider */}
        <div className="divider w-16 sm:w-20 md:w-24 h-[2px] 
          bg-gradient-to-r from-transparent via-slate-400 to-transparent 
          mx-auto my-4 sm:my-5 md:my-6" />

        {/* Photo Frame */}
        <div className="photo-frame mx-auto my-6 sm:my-8 md:my-10 
          w-48 h-64 sm:w-56 sm:h-80 md:w-64 md:h-[22rem] lg:w-72 lg:h-96 
          rounded-[120px_120px_40px_40px] sm:rounded-[150px_150px_45px_45px] md:rounded-[180px_180px_50px_50px] 
          overflow-hidden relative">
          <div className="absolute inset-0 border-2 sm:border-3 md:border-4 
            border-slate-400/40 
            rounded-[120px_120px_40px_40px] sm:rounded-[150px_150px_45px_45px] md:rounded-[180px_180px_50px_50px] 
            shadow-2xl" />
          <div className="cover-photo w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600"
              className="w-full h-full object-cover"
              alt="Couple"
            />
          </div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
        </div>

        {/* Divider */}
        <div className="divider w-16 sm:w-20 md:w-24 h-[2px] 
          bg-gradient-to-r from-transparent via-slate-400 to-transparent 
          mx-auto my-4 sm:my-5 md:my-6" />

        {/* Guest Info */}
        <p className="guest-label text-xs sm:text-sm opacity-70 font-light tracking-wider">
          Kepada Yang Terhormat
        </p>
        <h2 className="guest-name text-xl sm:text-2xl md:text-3xl 
          font-semibold my-2 sm:my-3 tracking-wide text-slate-100 
          px-2 sm:px-4 break-words">
          {guest}
        </h2>
        <p className="guest-location text-xs sm:text-sm opacity-70 font-light tracking-wider">
          Di Tempat
        </p>

        {/* Open Button */}
        <button
          onClick={onOpen}
          className="open-button mt-6 sm:mt-8 md:mt-10 
            px-10 sm:px-12 md:px-14 py-3 sm:py-3.5 md:py-4 
            rounded-full 
            bg-gradient-to-r from-slate-100 to-white 
            text-slate-900 font-semibold 
            text-sm sm:text-base tracking-wide 
            shadow-[0_10px_30px_-10px_rgba(148,163,184,0.5)] 
            hover:shadow-[0_15px_40px_-10px_rgba(148,163,184,0.7)] 
            hover:scale-105 
            active:scale-95
            transition-all duration-300 
            relative overflow-hidden group
            touch-manipulation">
          <span className="relative z-10">Buka Undangan</span>
          {/* Button Shine Effect */}
          <div className="absolute inset-0 -translate-x-full 
            group-hover:translate-x-full transition-transform duration-1000 
            bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </button>
      </div>
    </section>
  );
}