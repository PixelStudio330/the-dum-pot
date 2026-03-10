import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import your new components here
import Header from "./components/Header";
import Footer from "./components/Footer";
import SparkleTrail from "./components/SparkleTrail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Dum Pot | Heritage Corporate Catering",
  description: "Experience the symphony of steam and spice with our ancient art of slow-cooking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FDFBF0]`}
      >
        <Header />
        {/* We add a div or main wrapper if needed, 
            but Header and Footer will now persist across all routes */}
        {children}
        <Footer />
        <SparkleTrail />
      </body>
    </html>
  );
}