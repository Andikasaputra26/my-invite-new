"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import Image from "next/image";

const backgrounds = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
];

function SplitText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className || ""}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const [bg, setBg] = useState<string | null>(null);

  // pilih background hanya di client
  useEffect(() => {
    const random =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBg(random);
  }, []);

  useEffect(() => {
    if (!ref.current || !bg) return;

    const ctx = gsap.context(() => {
      // INTRO
      const intro = gsap.timeline({ delay: 0.2 });

    intro
      .from(".hero-bg", {
        scale: 1.2,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
      })
      .from(
        ".char",
        {
          y: 120,
          opacity: 0,
          rotateX: 90,
          transformOrigin: "50% 50% -40",
          filter: "blur(6px)",
          duration: 1,
          stagger: {
            each: 0.035,
            from: "start",
          },
          ease: "back.out(1.8)",
        },
        "-=0.9"
      )
      .from(
        ".hero-item:not(.hero-title)",
        {
          opacity: 0,
          y: 50,
          filter: "blur(4px)",
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // SCROLL
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=160%",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      scrollTl
        .to(".hero-bg", {
          scale: 1.3,
          y: 160,
          ease: "none",
        })
        .to(
          ".hero-content",
          {
            opacity: 0,
            y: -200,
            ease: "none",
          },
          0
        );
    }, ref);

    return () => ctx.revert();
  }, [bg]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center justify-center text-center text-white"
    >
      {/* Background */}
      <div className="hero-bg absolute inset-0 -z-10">
        {bg && (
          <Image
            src={bg}
            alt="Hero"
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="hero-content px-6">
        <p className="hero-item tracking-[3px] text-sm opacity-80 mb-4">
          WE ARE GETTING MARRIED
        </p>

        <h1 className="hero-item hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <SplitText text="Risky Santoso" className="block" />
          <SplitText text="& Nisa Wardani" className="block" />
        </h1>

        <p className="hero-item text-lg opacity-80">
          Sabtu, 20 Juni 2026
        </p>
      </div>
    </section>
  );
}
