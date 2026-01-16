"use client";

import Image from "next/image";

interface Props {
  name: string;
  fullName: string;
  image: string;
  description: string[];
  username: string;
}

export default function ProfileCard({
  name,
  fullName,
  image,
  description,
  username,
}: Props) {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
      {/* Background utama */}
      <Image
        src={image}
        alt={fullName}
        fill
        className="object-cover"
        priority={false}
      />

      {/* Overlay gelap tipis */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Glass Panel */}
      <div className="absolute inset-x-4 bottom-6 rounded-3xl bg-white/25 backdrop-blur-xl border border-white/30 p-6 text-center text-white">
        {/* Avatar bulat */}
        <div className="relative w-28 h-28 mx-auto -mt-16 mb-4 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <Image src={image} alt={fullName} fill className="object-cover" />
        </div>

        {/* Nama Script */}
        <p className="text-3xl italic font-serif mb-1">{name}</p>

        {/* Nama Lengkap */}
        <h3 className="text-lg font-semibold mb-2">{fullName}</h3>

        {/* Deskripsi */}
        <div className="text-sm leading-relaxed space-y-1 text-white/90">
          {description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>

        {/* Tombol */}
        <a
          href={`https://instagram.com/${username.replace("@", "")}`}
          target="_blank"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-4 py-2 text-sm hover:bg-white/20 transition"
        >
          {username}
          <span>→</span>
        </a>
      </div>
    </div>
  );
}
