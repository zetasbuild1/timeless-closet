"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import styles from "./HeroSlider.module.css";

const slides = [
  {
    id: 1,
    tag: "Timeless Collection",
    title: "Elevate Your<br/>Wardrobe.",
    subtitle: "Discover styles designed to last beyond the seasons.",
    image: "/images/home-hero1.jpg",
    bgColor: "#efece8"
  },
  {
    id: 2,
    tag: "Summer Essentials",
    title: "Embrace the<br/>Sunlight.",
    subtitle: "Lightweight fabrics for warmer days.",
    image: "/images/home-hero2.jpg",
    bgColor: "#efece8"
  },
  {
    id: 3,
    tag: "Premium Quality",
    title: "Crafted for<br/>Elegance.",
    subtitle: "Discover our premium selection of elegant attire.",
    image: "/images/home-hero3.jpg",
    bgColor: "#efece8"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={styles.hero}
      style={{ backgroundColor: slides[current].bgColor, transition: 'background-color 1s ease' }}
    >
      <div className={styles.fabricOverlay}></div>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === current ? styles.active : ''}`}
        >
          <img
            src={slide.image}
            alt="Fashion models"
            className={styles.heroImage}
          />


          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroContent}>
              <span className={styles.heroTag}>{slide.tag}</span>
              <h1
                className={styles.heroTitle}
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              <p className={styles.heroSubtitle}>{slide.subtitle}</p>
              <div className={styles.heroBtns}>
                <Link href="/shop?gender=women">
                  <Button variant="primary" size="lg">SHOP WOMEN</Button>
                </Link>
                <Link href="/shop?gender=men">
                  <Button variant="outline" size="lg">SHOP MEN</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Indicators */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicatorBtn} ${index === current ? styles.activeIndicator : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
