"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import SectionWrapper from "./SectionWrapper";

export default function Couple() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Intro animation
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      })
        .from(".couple-card", {
          y: 120,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: "power3.out",
        })
        .from(
          ".couple-image",
          {
            scale: 1.2,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=1"
        )
        .from(
          ".couple-eyebrow",
          {
            y: 20,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          ".couple-title",
          {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".couple-desc",
          {
            y: 30,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // Parallax ringan saat scroll
      gsap.to(".couple-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper>
      <section
        ref={ref}
        className="relative py-32 bg-gradient-to-b from-slate-100 via-white to-slate-100 overflow-hidden"
      >
        {/* Ornamen glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-200/30 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="couple-card relative overflow-hidden rounded-[3rem] border border-slate-200/60 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.35)]">
            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1600"
              alt="Couple"
              className="couple-image w-full h-[520px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-white/30 rounded-[3rem]" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-12 md:p-16 text-center text-white">
              <div className="couple-eyebrow mb-4 flex items-center justify-center gap-4 opacity-80">
                <span className="h-[1px] w-16 bg-white/40" />
                <span className="tracking-[4px] text-xs">OUR STORY</span>
                <span className="h-[1px] w-16 bg-white/40" />
              </div>

              <h2 className="couple-title text-4xl md:text-6xl font-semibold mb-4 leading-tight">
                Risky Santoso <span className="opacity-70">&</span> Nisa Wardani
              </h2>

              <p className="couple-desc max-w-xl mx-auto text-base md:text-lg text-white/85 leading-relaxed">
                Perjalanan cinta kami dimulai dari pertemuan sederhana,
                tumbuh menjadi janji, dan kini menuju satu ikatan suci.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
