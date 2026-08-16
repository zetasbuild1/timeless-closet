import type { Metadata } from "next";
import { Outfit, Great_Vibes } from "next/font/google";
import { ProductProvider } from "@/context/ProductContext";
import StorefrontLayout from "@/components/StorefrontLayout";
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
        <ProductProvider>
          <StorefrontLayout>{children}</StorefrontLayout>
        </ProductProvider>
      </body>
    </html>
  );
}

