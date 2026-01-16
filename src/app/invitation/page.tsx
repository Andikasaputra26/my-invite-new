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

const images = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
];

interface Props {
  name: string;
  fullName: string;
  image: string;
  description: string[];
  username: string;
}


export default function Home(): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);
  const [img, setImg] = useState<string | null>(null);

  // pilih gambar random hanya di client
  useEffect(() => {
    const random = images[Math.floor(Math.random() * images.length)];
    setImg(random);
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

        {img && (
          <ScrollReveal>
            <ProfileCard
              name="Alif"
              fullName="Muhammad Nur Alif, S.T"
              image={img}
              description={[
                "Anak ke 3 dari 3 bersaudara",
                "Bpk. Rukman Saleh, S.Km &",
                "Ibu Hj. St. Hajrah",
              ]}
              username="@Mhmmd_nuralif"
            />
          </ScrollReveal>
        )}

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
