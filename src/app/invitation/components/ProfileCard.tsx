"use client";

import Image from "next/image";

interface Props {
  name: string;
  fullName: string;
  description: string[];
  image: string;
  username: string;
}

export default function ProfileCard({
  name,
  fullName,
  description,
  image,
  username,
}: Props) {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
      {/* Background Image */}
      <Image
        src={image}
        alt={fullName}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Glass Card */}
      <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6 rounded-3xl bg-white/30 backdrop-blur-xl border border-white/30 p-5 md:p-6 text-center text-white">
        {/* Avatar */}
        <div className="relative w-32 h-44 md:w-40 md:h-56 mx-auto -mt-28 mb-6 rounded-[2rem_2rem_0.75rem_0.75rem] overflow-hidden border-4 border-white shadow-xl">
            <Image src={image} alt={fullName} fill className="object-cover" />
        </div>

        {/* Name */}
        <h3 className="text-xl md:text-2xl font-semibold">{fullName}</h3>
        <p className="mt-1 text-3xl md:text-4xl font-script italic">
          {name}
        </p>

        {/* Description */}
        <div className="mt-3 space-y-1 text-sm md:text-[15px] text-white/90">
          {description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>

        {/* Button */}
        <a
          href={`https://instagram.com/${username.replace("@", "")}`}
          target="_blank"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-5 py-2 text-sm hover:bg-white/20 transition"
        >
          {username}
          <span>→</span>
        </a>
      </div>
    </div>
  );
}
