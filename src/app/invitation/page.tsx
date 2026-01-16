"use client";

import { JSX, Suspense, useEffect, useState } from "react";

import Cover from "./components/Cover";
import Hero from "./components/Hero";
import Couple from "./components/Couple";
import Event from "./components/Event";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import MusicButton from "./components/MusicButton";
import SmoothScroll from "./components/SmoothScroll";
import ScrollReveal from "./components/ScrollReveal";
import ProfileCard from "./components/ProfileCard";
import GroomCard from "./components/GroomCard";
import BrideCard from "./components/BrideCard";

const images = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
];

export default function Home(): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);
  const [img1, setImg1] = useState<string | null>(null);
  const [img2, setImg2] = useState<string | null>(null);

  useEffect(() => {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    setImg1(shuffled[0]);
    setImg2(shuffled[1] ?? shuffled[0]);
  }, []);

  return (
    <>
      <SmoothScroll />

      {!opened && (
        <Suspense fallback={null}>
          <Cover onOpen={() => setOpened(true)} />
        </Suspense>
      )}

      <main
        className={`transition-all duration-[1500ms] ease-out ${
          opened ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
        }`}
      >
        <Hero />

        <ScrollReveal>
          <Couple />
        </ScrollReveal>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <GroomCard />
          </ScrollReveal>

          <ScrollReveal>
            <BrideCard />
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <Event />
        </ScrollReveal>

        <ScrollReveal>
          <Gallery />
        </ScrollReveal>

        <ScrollReveal>
          <Location />
        </ScrollReveal>

        <ScrollReveal>
          <RSVP />
        </ScrollReveal>

        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </main>

      <MusicButton />
    </>
  );
}
