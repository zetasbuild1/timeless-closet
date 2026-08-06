"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import styles from "./HeroSlider.module.css";

const slides = [
  {
    id: 1,
    tag: "New Collection 2024",
    title: "Timeless Style.<br/>Modern You.",
    subtitle: "Style that stays with you, every moment.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bgColor: "#f6f4f1" // Warm beige matching the first image
  },
  {
    id: 2,
    tag: "Summer Essentials",
    title: "Embrace the<br/>Sunlight.",
    subtitle: "Lightweight fabrics for warmer days.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bgColor: "#f3f0eb"
  },
  {
    id: 3,
    tag: "Premium Quality",
    title: "Crafted for<br/>Elegance.",
    subtitle: "Discover our premium selection of coats and jackets.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bgColor: "#ececec"
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
          <div className={styles.imageOverlay} style={{ background: `linear-gradient(to right, ${slide.bgColor} 0%, transparent 100%)` }}></div>
          
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroContent}>
              <span className={styles.heroTag}>{slide.tag}</span>
              <h1 
                className={styles.heroTitle} 
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              <p className={styles.heroSubtitle}>{slide.subtitle}</p>
              <div className={styles.heroBtns}>
                <Link href="/shop?category=women">
                  <Button variant="primary" size="lg">SHOP WOMEN</Button>
                </Link>
                <Link href="/shop?category=men">
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
