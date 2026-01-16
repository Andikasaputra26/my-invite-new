"use client";

import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";

const images = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
];

export default function GroomCard() {
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    const random = images[Math.floor(Math.random() * images.length)];
    setImg(random);
  }, []);

  if (!img) return null;

  return (
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
  );
}
