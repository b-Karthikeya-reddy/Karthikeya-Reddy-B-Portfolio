import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Starfield from "@/components/Starfield";
import AmbientToggle from "@/components/AmbientToggle";
// The stylesheet is resolved by Next.js at build time.
// @ts-expect-error The project's TypeScript configuration does not declare CSS modules.
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Karthik — Portfolio",
  description:
    "Junior CS student at CCNY focused on AI agents and full-stack development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-night">
      <body
        className={`${inter.variable} ${fraunces.variable} bg-transparent font-sans text-primary antialiased`}
      >
        <Starfield />
        <Nav />
        <div className="relative z-10">{children}</div>
        <AmbientToggle />
      </body>
    </html>
  );
}
