"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

// Helper untuk pecah teks jadi span per kata
function splitTextToWords(text: string) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="inline-block mr-2 opacity-0">
      {word}
    </span>
  ));
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const deco1Ref = useRef<HTMLDivElement>(null);
  const deco2Ref = useRef<HTMLDivElement>(null);
  const floatRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("span");
        gsap.fromTo(
          words,
          { y: 60, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
          }
        );
      }

      if (subtitleRef.current) {
        const words = subtitleRef.current.querySelectorAll("span");
        gsap.fromTo(
          words,
          { y: 20, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            delay: 0.8,
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 1.6,
        }
      );

      [deco1Ref.current, deco2Ref.current].forEach((deco, i) => {
        if (deco) {
          gsap.to(deco, {
            y: i % 2 === 0 ? -30 : -20,
            rotate: i % 2 === 0 ? 15 : -10,
            duration: 3 + i,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });

      floatRefs.current.forEach((img, i) => {
        if (img) {
          gsap.fromTo(
            img,
            { opacity: 0, scale: 0.5, y: 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: i * 0.3,
              scrollTrigger: {
                trigger: img,
                start: "top 90%",
              },
              onComplete: () => {
                gsap.to(img, {
                  y: () => gsap.utils.random(-20, 20),
                  x: () => gsap.utils.random(-15, 15),
                  rotation: () => gsap.utils.random(-10, 10),
                  duration: 3 + i,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              },
            }
          );
        }
      });

      // Hover animasi tombol
      if (ctaRef.current) {
        const btn = ctaRef.current;
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { scale: 1.1, duration: 0.3, ease: "power2.out" })
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.inOut" })
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex h-screen items-center justify-center overflow-hidden text-center text-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/marry.mp4"
        autoPlay
        muted
        loop
        playsInline
      ></video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-purple-900/40 to-black/60"></div>

      <div
        ref={deco1Ref}
        className="absolute top-20 left-10 h-32 w-32 rounded-full bg-pink-400/40 blur-3xl"
      ></div>
      <div
        ref={deco2Ref}
        className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-purple-500/40 blur-3xl"
      ></div>

      <Image
        ref={(el) => {
          if (el) floatRefs.current[0] = el;
        }}
        src="https://source.unsplash.com/80x80/?wedding,ring"
        alt="ring"
        className="absolute top-32 left-1/4 h-12 w-12 rounded-full object-cover shadow-lg"
      />
      <Image
        ref={(el) => {
          if (el) floatRefs.current[1] = el;
        }}
        src="https://source.unsplash.com/80x80/?flowers,rose"
        alt="rose"
        className="absolute bottom-32 right-1/4 h-14 w-14 rounded-full object-cover shadow-lg"
      />
      <Image
        ref={(el) => {
          if (el) floatRefs.current[2] = el;
        }}
        src="https://source.unsplash.com/80x80/?love,heart"
        alt="heart"
        className="absolute top-1/3 right-20 h-10 w-10 rounded-full object-cover shadow-lg"
      />

      <div className="relative z-10 max-w-2xl p-6">
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg md:text-6xl"
        >
          {splitTextToWords("Undangan Digital Elegan & Interaktif")}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 text-lg text-gray-200 opacity-90 md:text-xl"
        >
          {splitTextToWords(
            "Buat momen spesial lebih berkesan dengan undangan modern penuh fitur dan desain menawan."
          )}
        </p>
        <button
          ref={ctaRef}
          className="relative z-20 mt-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-10 py-4 text-lg font-semibold shadow-lg shadow-purple-500/40 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Pesan Sekarang
        </button>
      </div>
    </section>
  );
}
