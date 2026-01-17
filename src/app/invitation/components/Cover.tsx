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

      // Select all elements
      const bg = root.querySelector(".cover-bg");
      const overlay = root.querySelector(".cover-overlay");
      const card = root.querySelector(".cover-card");
      const ornaments = root.querySelectorAll(".ornament");
      const labels = root.querySelectorAll(".cover-label, .guest-label, .guest-location");
      const chars = root.querySelectorAll(".cover-title .char");
      const dividers = root.querySelectorAll(".divider");
      const flowerDividers = root.querySelectorAll(".flower-divider");
      const photo = root.querySelector(".cover-photo img");
      const frame = root.querySelector(".photo-frame");
      const photoShine = root.querySelector(".photo-shine");
      const guestName = root.querySelector(".guest-name");
      const button = root.querySelector(".open-button");
      const corners = root.querySelectorAll(".corner-decoration");
      const particles = root.querySelectorAll(".particle");

      // Set initial states
      gsap.set(bg, { scale: 1.2, opacity: 0 });
      gsap.set(overlay, { opacity: 0 });
      gsap.set(card, { y: 100, opacity: 0, scale: 0.9 });
      gsap.set(ornaments, { scale: 0, opacity: 0, rotation: -90 });
      gsap.set(corners, { scale: 0, opacity: 0 });
      gsap.set(labels, { y: 30, opacity: 0 });
      gsap.set(chars, { y: 50, opacity: 0, rotationY: -45 });
      gsap.set(dividers, { scaleX: 0, opacity: 0 });
      gsap.set(flowerDividers, { scale: 0, opacity: 0, rotation: -180 });
      gsap.set(frame, { scale: 0.8, opacity: 0, y: 30 });
      gsap.set(photo, { scale: 1.3, opacity: 0 });
      gsap.set(photoShine, { x: "-100%" });
      gsap.set(guestName, { y: 30, opacity: 0, scale: 0.95 });
      gsap.set(button, { y: 40, opacity: 0, scale: 0.8 });
      gsap.set(particles, { scale: 0, opacity: 0 });

      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(bg, { scale: 1, opacity: 1, duration: 1.8 })
        .to(overlay, { opacity: 1, duration: 1.2 }, "-=1.2")
        .to(card, { y: 0, opacity: 1, scale: 1, duration: 1.2 }, "-=0.8")
        .to(ornaments, { 
          scale: 1, 
          opacity: 0.5, 
          rotation: 0, 
          duration: 1, 
          stagger: 0.1,
          ease: "back.out(1.5)"
        }, "-=0.8")
        .to(corners, { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.08,
          ease: "back.out(2)"
        }, "-=0.6")
        .to(particles, { 
          scale: 1, 
          opacity: 0.6, 
          duration: 0.8, 
          stagger: 0.04 
        }, "-=0.6")
        .to(labels[0], { y: 0, opacity: 0.9, duration: 0.7 }, "-=0.4")
        .to(chars, { 
          y: 0, 
          opacity: 1, 
          rotationY: 0, 
          duration: 0.8, 
          stagger: 0.015,
          ease: "back.out(1.2)"
        }, "-=0.3")
        .to(flowerDividers[0], { 
          scale: 1, 
          opacity: 1, 
          rotation: 0, 
          duration: 0.7,
          ease: "back.out(1.5)"
        }, "-=0.4")
        .to(dividers[0], { scaleX: 1, opacity: 1, duration: 0.8 }, "-=0.5")
        .to(frame, { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          ease: "back.out(1.3)"
        }, "-=0.5")
        .to(photo, { scale: 1, opacity: 1, duration: 1.2 }, "-=1")
        .to(photoShine, { x: "100%", duration: 1, ease: "power2.inOut" }, "-=0.6")
        .to(dividers[1], { scaleX: 1, opacity: 1, duration: 0.8 }, "-=0.5")
        .to(flowerDividers[1], { 
          scale: 1, 
          opacity: 1, 
          rotation: 0, 
          duration: 0.7,
          ease: "back.out(1.5)"
        }, "-=0.6")
        .to(labels[1], { y: 0, opacity: 0.9, duration: 0.6 }, "-=0.3")
        .to(guestName, { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.8,
          ease: "back.out(1.3)"
        }, "-=0.2")
        .to(labels[2], { y: 0, opacity: 0.9, duration: 0.6 }, "-=0.4")
        .to(button, { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.9,
          ease: "back.out(2)"
        }, "-=0.2");

      // Continuous animations
      gsap.to(button, {
        y: -8,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.3,
      });

      gsap.to(ornaments, {
        y: "random(-12, 12)",
        x: "random(-8, 8)",
        rotation: "random(-3, 3)",
        duration: "random(3, 4.5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.25,
          repeat: -1,
        },
      });

      gsap.to(particles, {
        y: "random(-15, 15)",
        x: "random(-12, 12)",
        scale: "random(0.85, 1.15)",
        opacity: "random(0.4, 0.7)",
        duration: "random(2.5, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.15,
          repeat: -1,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ display: 'inline-block' }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={ref}
      className="cover-bg fixed inset-0 z-50 flex items-center justify-center overflow-hidden
        bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200')]
        bg-cover bg-center px-4"
    >
      {/* Overlay */}
      <div className="cover-overlay absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-indigo-950/95" />

      {/* Floating particles */}
      {[
        { top: '10%', left: '15%', size: 'w-2 h-2' },
        { top: '25%', right: '20%', size: 'w-3 h-3' },
        { bottom: '30%', left: '25%', size: 'w-2 h-2' },
        { bottom: '15%', right: '15%', size: 'w-3 h-3' },
        { top: '50%', left: '10%', size: 'w-2 h-2' },
        { top: '40%', right: '8%', size: 'w-2 h-2' },
      ].map((particle, i) => (
        <div
          key={i}
          className={`particle absolute ${particle.size} rounded-full bg-slate-300/40 blur-[1px]`}
          style={{ 
            top: particle.top, 
            left: particle.left, 
            bottom: particle.bottom, 
            right: particle.right 
          }}
        />
      ))}

      {/* Decorative ornaments */}
      <div className="ornament absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100 20 L110 80 L170 80 L120 120 L140 180 L100 140 L60 180 L80 120 L30 80 L90 80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-slate-300/40"
          />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-400/20" />
        </svg>
      </div>

      <div className="ornament absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rotate-180 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100 20 L110 80 L170 80 L120 120 L140 180 L100 140 L60 180 L80 120 L30 80 L90 80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-slate-300/40"
          />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-400/20" />
        </svg>
      </div>

      {/* Main Card */}
      <div className="cover-card relative text-center text-slate-100 backdrop-blur-2xl 
        bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/60
        border-2 border-slate-300/30 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] 
        p-6 sm:p-8 md:p-10 lg:p-14
        shadow-[0_20px_40px_-10px_rgba(15,23,42,0.8)]
        w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl
        mx-auto">

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        </div>

        {/* Corner decorations */}
        {[
          { pos: 'top-3 left-3 sm:top-4 sm:left-4', border: 'border-l-2 border-t-2', round: 'rounded-tl-2xl sm:rounded-tl-3xl', dot: 'top-1 left-1' },
          { pos: 'top-3 right-3 sm:top-4 sm:right-4', border: 'border-r-2 border-t-2', round: 'rounded-tr-2xl sm:rounded-tr-3xl', dot: 'top-1 right-1' },
          { pos: 'bottom-3 left-3 sm:bottom-4 sm:left-4', border: 'border-l-2 border-b-2', round: 'rounded-bl-2xl sm:rounded-bl-3xl', dot: 'bottom-1 left-1' },
          { pos: 'bottom-3 right-3 sm:bottom-4 sm:right-4', border: 'border-r-2 border-b-2', round: 'rounded-br-2xl sm:rounded-br-3xl', dot: 'bottom-1 right-1' },
        ].map((corner, i) => (
          <div key={i} className={`corner-decoration absolute ${corner.pos} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14`}>
            <div className={`absolute inset-0 ${corner.border} border-slate-300/40 ${corner.round}`} />
            <div className={`absolute ${corner.dot} w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-slate-300/30`} />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10">
          <p className="cover-label tracking-[8px] text-[10px] sm:text-xs uppercase opacity-80 mb-3 font-light 
            text-slate-200">
            The Wedding Of
          </p>

          <h1 className="cover-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold my-4 sm:my-6 leading-tight
            text-white">
            {splitText("Risky Santoso & Nisa Wardani")}
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-4 sm:my-6">
            <div className="divider flex-1 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-slate-300/60 to-slate-300/60" />
            <div className="flower-divider">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-slate-300/70 sm:w-6 sm:h-6">
                <path d="M12 2C12 2 9 5 9 8C9 9.66 10.34 11 12 11C13.66 11 15 9.66 15 8C15 5 12 2 12 2Z" fill="currentColor" />
                <path d="M12 22C12 22 15 19 15 16C15 14.34 13.66 13 12 13C10.34 13 9 14.34 9 16C9 19 12 22 12 22Z" fill="currentColor" />
                <path d="M2 12C2 12 5 9 8 9C9.66 9 11 10.34 11 12C11 13.66 9.66 15 8 15C5 15 2 12 2 12Z" fill="currentColor" />
                <path d="M22 12C22 12 19 15 16 15C14.34 15 13 13.66 13 12C13 10.34 14.34 9 16 9C19 9 22 12 22 12Z" fill="currentColor" />
              </svg>
            </div>
            <div className="divider flex-1 h-[1.5px] sm:h-[2px] bg-gradient-to-l from-transparent via-slate-300/60 to-slate-300/60" />
          </div>

          {/* Photo frame */}
          <div className="photo-frame mx-auto my-6 sm:my-8 md:my-10 
            w-48 h-64 sm:w-56 sm:h-80 md:w-64 md:h-[22rem] lg:w-72 lg:h-96 
            rounded-[120px_120px_40px_40px] sm:rounded-[140px_140px_45px_45px] md:rounded-[160px_160px_50px_50px] 
            overflow-hidden relative
            shadow-[0_15px_40px_-8px_rgba(0,0,0,0.7)]">
            
            <div className="absolute inset-0 border-[2px] sm:border-[3px] border-slate-300/50 
              rounded-[120px_120px_40px_40px] sm:rounded-[140px_140px_45px_45px] md:rounded-[160px_160px_50px_50px] z-20" />
            <div className="absolute inset-[2px] sm:inset-1 border-[1.5px] sm:border-[2px] border-slate-400/30 
              rounded-[118px_118px_38px_38px] sm:rounded-[138px_138px_43px_43px] md:rounded-[155px_155px_48px_48px] z-20" />
            
            <div className="cover-photo w-full h-full relative">
              <img
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600"
                className="w-full h-full object-cover"
                alt="Couple"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20" />
            </div>

            <div className="photo-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              skew-x-12 z-30 pointer-events-none" />
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-4 sm:my-6">
            <div className="divider flex-1 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-slate-300/60 to-slate-300/60" />
            <div className="flower-divider rotate-45">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-slate-300/70 sm:w-6 sm:h-6">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12 2L13 8L12 12L11 8Z" fill="currentColor" />
                <path d="M12 22L11 16L12 12L13 16Z" fill="currentColor" />
                <path d="M2 12L8 11L12 12L8 13Z" fill="currentColor" />
                <path d="M22 12L16 13L12 12L16 11Z" fill="currentColor" />
              </svg>
            </div>
            <div className="divider flex-1 h-[1.5px] sm:h-[2px] bg-gradient-to-l from-transparent via-slate-300/60 to-slate-300/60" />
          </div>

          {/* Guest info */}
          <p className="guest-label text-xs sm:text-sm opacity-80 font-light tracking-[3px] 
            text-slate-200 mb-2">
            Kepada Yang Terhormat
          </p>
          <h2 className="guest-name text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold my-2 sm:my-3 
            text-slate-50 tracking-wide">
            {guest}
          </h2>
          <p className="guest-location text-xs sm:text-sm opacity-80 font-light tracking-[3px] 
            text-slate-200">
            Di Tempat
          </p>

          {/* Button */}
          <button
            onClick={onOpen}
            className="open-button mt-6 sm:mt-8 md:mt-10 
              px-8 sm:px-12 md:px-16 
              py-3 sm:py-4 md:py-5 
              rounded-full 
              bg-gradient-to-r from-slate-50 via-white to-slate-50
              text-slate-900 font-bold 
              text-xs sm:text-sm md:text-base 
              tracking-[1.5px] sm:tracking-[2px] 
              uppercase
              shadow-[0_10px_30px_-5px_rgba(148,163,184,0.5)]
              hover:shadow-[0_15px_40px_-5px_rgba(148,163,184,0.7)]
              hover:scale-105 active:scale-95
              transition-all duration-300 
              relative overflow-hidden group">
            
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-pulse sm:w-5 sm:h-5">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Buka Undangan
            </span>
            
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
              transition-transform duration-700 
              bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </button>
        </div>
      </div>
    </section>
  );
}