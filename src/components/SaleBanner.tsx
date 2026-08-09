"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./SaleBanner.module.css";

const SLIDER_IMAGES = [
  "/images/products/peacock-stripe-long-dress1.webp",
  "/images/products/floral-peplum-top1.webp",
  "/images/products/mens-olive-stripe-short-sleeve-shirt1.webp",
  "/images/products/pink-stripe-ladies-oversized-shirt1.webp"
];

export default function SaleBanner() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.saleBanner}>
      <div className={styles.saleContent}>
        <span className={styles.saleTag}>SUMMER SALE</span>
        <h2 className={styles.saleTitle}>Up to 30% Off</h2>
        <p className={styles.saleSubtitle}>On selected items</p>
        <Link href="/shop?sale=true" className={styles.shopNowBtn}>
          SHOP NOW
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
      <div className={styles.saleImageWrapper}>
        {SLIDER_IMAGES.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt="Summer Sale"
            loading={idx === 0 ? "eager" : "lazy"}
            className={`${styles.sliderImage} ${idx === currentIdx ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
