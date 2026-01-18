"use client";

import { JSX, useState } from "react";

type Comment = {
  name: string;
  message: string;
  status: string;
};

export default function RSVP(): JSX.Element {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || !status) return;

    setComments((prev) => [
      { name, message, status },
      ...prev,
    ]);

    setName("");
    setMessage("");
    setStatus("");
  };

  return (
    <section className="py-24 text-center bg-[#faf7f2]">
      <h2 className="text-4xl mb-8 text-black">Ucapan & Konfirmasi</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border text-black rounded-xl p-4"
          placeholder="Nama"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-black border rounded-xl p-4 min-h-[120px]"
          placeholder="Ucapan & Doa"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border text-black rounded-xl p-4"
        >
          <option value="">Konfirmasi Kehadiran</option>
          <option value="Hadir">Hadir</option>
          <option value="Tidak Hadir">Tidak Hadir</option>
        </select>

        <button
          type="submit"
          className="w-full bg-yellow-400 py-4 rounded-full font-semibold hover:scale-105 transition"
        >
          Kirim
        </button>
      </form>

      {/* Daftar Ucapan */}
      <div className="max-w-2xl mx-auto mt-16 px-4 space-y-4">
        {comments.map((c, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow-md text-left flex gap-4"
          >
            {/* Avatar Inisial */}
            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-lg">
              {c.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-black">{c.name}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    c.status === "Hadir"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{c.message}</p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-gray-500 italic">
            Belum ada ucapan. Jadilah yang pertama ✨
          </p>
        )}
      </div>
    </section>
  );
}
