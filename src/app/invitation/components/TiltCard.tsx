"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function TiltCard({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = -((y / rect.height) - 0.5) * 12;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  }

  function reset() {
    const el = ref.current;
    if (!el) return;

    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;

      const rotateX = Math.max(-12, Math.min(12, e.beta / 3));
      const rotateY = Math.max(-12, Math.min(12, e.gamma / 3));

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    let enabled = false;

    const enable = () => {
      if (enabled) return;
      enabled = true;
      window.addEventListener("deviceorientation", handleOrientation);
    };

    const AnyDeviceOrientation = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof AnyDeviceOrientation?.requestPermission === "function") {
      AnyDeviceOrientation.requestPermission()
        .then((state) => {
          if (state === "granted") enable();
        })
        .catch(() => {
        });
    } else {
      enable();
    }

    return () => {
      if (enabled) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="transition-transform duration-300 will-change-transform"
    >
      {children}
    </div>
  );
}
