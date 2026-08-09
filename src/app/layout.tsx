import type { Metadata } from "next";
import { Outfit, Great_Vibes } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-logo' });

export const metadata: Metadata = {
  title: "Timeless. | Modern Style",
  description: "E-Commerce Clothing Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${greatVibes.variable}`}>
        <CustomCursor />
        <Preloader />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
