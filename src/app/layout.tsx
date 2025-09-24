import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Great_Vibes } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Undangan Digital Elegan",
  description: "Buat undangan digital Anda dengan mudah dan elegan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
