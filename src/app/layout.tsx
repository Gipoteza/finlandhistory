import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import FilmGrainOverlay from "@/components/layout/FilmGrainOverlay";
import SoundController from "@/components/layout/SoundController";

export const metadata: Metadata = {
  title: "Великое княжество Финляндское (1809–1917)",
  description:
    "Кинематографический storytelling-сайт об истории Финляндии в составе Российской империи",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className="bg-cinema-black text-cinema-cream antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
        <FilmGrainOverlay />
        <SoundController />
      </body>
    </html>
  );
}
