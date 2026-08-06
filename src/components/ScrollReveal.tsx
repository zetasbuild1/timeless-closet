"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function ScrollReveal({ 
  children,
  className = "",
  as: Component = "div"
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { 
      threshold: 0, // 0 ensures it triggers the absolute second ANY pixel of the element enters view
      rootMargin: "0px 0px -20px 0px" // Triggers when the top of the element is 20px above the bottom of screen
    });

    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <Component 
      ref={ref} 
      className={`${styles.reveal} ${isVisible ? styles.visible : ''} ${className}`}
    >
      {children}
    </Component>
  );
}
