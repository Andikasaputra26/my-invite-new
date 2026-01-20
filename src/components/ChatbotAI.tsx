"use client";

import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatbotAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Halo! 👋 Saya asisten AI untuk undangan digital. Ada yang bisa saya bantu? Anda bisa bertanya tentang paket, fitur, atau cara pemesanan.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Knowledge base untuk FAQ
  const knowledgeBase = {
    paket: {
      keywords: ["paket", "harga", "biaya", "price", "pricing"],
      response: `Kami menyediakan 3 paket undangan digital:

📦 **Basic - Rp 150.000**
- Template premium
- Responsive design
- Musik latar
- Galeri foto (max 10)
- Maps lokasi

📦 **Standard - Rp 250.000**
- Semua fitur Basic
- Galeri foto unlimited
- RSVP & wishes
- Countdown timer
- Filter Instagram

📦 **Premium - Rp 350.000**
- Semua fitur Standard
- Custom design
- Video background
- Love story timeline
- Guest book digital
- Revisi unlimited

Paket mana yang Anda minati?`,
    },
    fitur: {
      keywords: ["fitur", "feature", "apa saja", "include", "termasuk"],
      response: `Fitur-fitur undangan digital kami:

✨ **Design & Layout**
- Responsive di semua device
- Animasi smooth & elegant
- Custom warna & tema

🎵 **Media**
- Musik latar otomatis
- Galeri foto interaktif
- Video background (paket premium)

📍 **Informasi Acara**
- Detail waktu & lokasi
- Google Maps terintegrasi
- Countdown timer

💬 **Interaktif**
- RSVP konfirmasi kehadiran
- Guest book / wishes
- Share ke social media

🎨 **Customization**
- Edit nama & tanggal
- Upload foto sendiri
- Pilih template favorit

Ada fitur khusus yang ingin Anda tanyakan?`,
    },
    pemesanan: {
      keywords: ["pesan", "order", "beli", "cara", "bagaimana"],
      response: `Cara pemesanan sangat mudah:

1️⃣ **Pilih Template**
   - Lihat demo di halaman "Demo Aplikasi"
   - Pilih template favorit Anda

2️⃣ **Isi Form Pemesanan**
   - Klik tombol "Pesan Sekarang"
   - Lengkapi data mempelai & acara

3️⃣ **Pembayaran**
   - Transfer ke rekening resmi
   - Konfirmasi pembayaran

4️⃣ **Proses Pengerjaan**
   - Estimasi 2x24 jam
   - Revisi gratis sampai puas

5️⃣ **Serah Terima**
   - Link undangan siap dibagikan
   - Tutorial penggunaan lengkap

Siap untuk order sekarang?`,
    },
    waktu: {
      keywords: ["lama", "waktu", "estimasi", "pengerjaan", "jadi"],
      response: `⏰ **Estimasi Waktu Pengerjaan:**

- Setelah pembayaran dikonfirmasi: **2x24 jam**
- Revisi tambahan: **1x24 jam** per revisi
- Urgent/express (+ biaya): **1x24 jam**

**Proses:**
1. Hari ke-1: Desain & layout
2. Hari ke-2: Review & revisi
3. Serah terima: Link siap pakai

Kami pastikan undangan Anda selesai tepat waktu! 🎉`,
    },
    revisi: {
      keywords: ["revisi", "edit", "ubah", "ganti", "change"],
      response: `🔄 **Kebijakan Revisi:**

**Paket Basic & Standard:**
- 3x revisi gratis
- Revisi tambahan: Rp 25.000/revisi

**Paket Premium:**
- Revisi UNLIMITED gratis
- Bebas ubah sampai puas

**Yang bisa direvisi:**
- Nama & data mempelai
- Foto & video
- Warna tema
- Tata letak
- Teks & kalimat

**Tidak termasuk:**
- Ganti template (berbeda)
- Fitur di luar paket

Revisi mudah via WhatsApp!`,
    },
    kontak: {
      keywords: ["kontak", "hubungi", "whatsapp", "wa", "telp", "phone"],
      response: `📞 **Hubungi Kami:**

**WhatsApp:**
+62 812 3456 7890
(Chat langsung dengan CS)

**Email:**
info@undangandigital.com

**Jam Operasional:**
Senin - Sabtu: 09.00 - 21.00 WIB
Minggu: 10.00 - 18.00 WIB

Fast response via WhatsApp! 💬`,
    },
    pembayaran: {
      keywords: ["bayar", "transfer", "payment", "rekening", "metode"],
      response: `💳 **Metode Pembayaran:**

**Transfer Bank:**
- BCA: 1234567890 (a.n. Undangan Digital)
- Mandiri: 0987654321 (a.n. Undangan Digital)
- BRI: 1122334455 (a.n. Undangan Digital)

**E-Wallet:**
- DANA: 081234567890
- GoPay: 081234567890
- OVO: 081234567890

**Ketentuan:**
- Full payment sebelum pengerjaan
- Konfirmasi via WhatsApp
- Bukti transfer wajib disertakan

Setelah transfer, kirim bukti ke WA ya! 📱`,
    },
  };

  const findBestResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Cek setiap kategori knowledge base
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (value.keywords.some(keyword => input.includes(keyword))) {
        return value.response;
      }
    }

    // Default response jika tidak ada match
    return `Maaf, saya belum memahami pertanyaan Anda. 

Beberapa hal yang bisa saya bantu:
- Info paket & harga
- Fitur undangan digital
- Cara pemesanan
- Waktu pengerjaan
- Revisi & edit
- Kontak & pembayaran

Atau Anda bisa langsung hubungi kami via WhatsApp: +62 812 3456 7890 😊`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 800));

    const responseText = findBestResponse(currentInput);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Apa saja paket yang tersedia?",
    "Berapa lama proses pengerjaannya?",
    "Fitur apa saja yang ada?",
    "Bagaimana cara pemesanan?",
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-2xl hover:shadow-pink-300/50 hover:scale-110 transition-all duration-300 group"
        >
          <FaComments className="text-xl group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-sm">Chat dengan AI</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FaRobot className="text-white text-xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">AI Assistant</h3>
                <p className="text-white/80 text-xs">Online - Siap membantu</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <FaTimes className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-pink-50/30 to-purple-50/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-none"
                      : "bg-white shadow-md text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-md rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center mb-2">
                  Pertanyaan cepat:
                </p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left px-4 py-2 rounded-xl bg-white hover:bg-pink-50 border border-pink-200 text-sm text-gray-700 transition-all hover:shadow-md"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pertanyaan Anda..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI Assistant - FAQ Based
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}