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
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
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
