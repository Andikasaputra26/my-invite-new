"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function ScrollReveal({
  children,
  y = 80,
  duration = 1,
}: {
  children: React.ReactNode;
  y?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [y, duration]);

  return <div ref={ref}>{children}</div>;
}
