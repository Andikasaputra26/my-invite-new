"use client";

import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
];

export default function BrideCard() {
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    const random = images[Math.floor(Math.random() * images.length)];
    setImg(random);
  }, []);

  if (!img) return null;

  return (
    <ProfileCard
      name="Nisa"
      fullName="Nisa Wardani, S.Pd"
      image={img}
      description={[
        "Anak pertama dari 2 bersaudara",
        "Bpk. H. Ahmad Wardana &",
        "Ibu Hj. Siti Aminah",
      ]}
      username="@nisawardani"
    />
  );
}
