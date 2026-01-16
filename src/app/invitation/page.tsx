"use client";

import { JSX, Suspense, useState } from "react";

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
import GroomCard from "./components/GroomCard";
import BrideCard from "./components/BrideCard";
import TiltCard from "./components/TiltCard";

export default function Home(): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);

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
            <TiltCard>
              <GroomCard />
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal>
            <TiltCard>
              <BrideCard />
            </TiltCard>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <Event />
        </ScrollReveal>

        <ScrollReveal>
          <TiltCard>
            <Gallery />
          </TiltCard>
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
