import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Anda adalah asisten AI untuk layanan undangan digital pernikahan. 
            
Informasi tentang layanan kami:
- Kami menyediakan undangan digital premium untuk pernikahan
- 3 Paket tersedia: Basic (Rp 150.000), Standard (Rp 250.000), Premium (Rp 350.000)
- Fitur: Responsive design, animasi smooth, musik latar, galeri foto, maps lokasi, RSVP
- Estimasi pengerjaan: 2x24 jam setelah pembayaran
- Revisi gratis sampai puas
- Support WhatsApp: +62 812 3456 7890

Jawab pertanyaan berikut dengan ramah, informatif, dan dalam Bahasa Indonesia:

${message}`,
          },
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}