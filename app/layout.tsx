import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inria_Serif } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "300", "700"],
})

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Himani's Portfolio",
  description: "Himani Manjunath Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inriaSerif.className} ${sourceSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
