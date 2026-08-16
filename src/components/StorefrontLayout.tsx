"use client";

import React, { Suspense, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.remove('has-custom-cursor');
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.add('has-custom-cursor');
      document.body.classList.remove('admin-mode');
    }
  }, [isAdmin]);

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <CustomCursor />
      <Preloader />
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
