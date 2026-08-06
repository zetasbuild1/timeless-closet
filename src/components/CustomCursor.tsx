"use client";

import { useEffect, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOut = () => setIsVisible(false);
    
    // Add event listeners for interactive elements to grow the cursor
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Smooth follow for the outer ring using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    
    const followMouse = () => {
      setRingPosition((prevPos) => {
        const dx = mousePosition.x - prevPos.x;
        const dy = mousePosition.y - prevPos.y;
        
        // Easing factor (lower = slower follow)
        const easing = 0.15;
        
        return {
          x: prevPos.x + dx * easing,
          y: prevPos.y + dy * easing,
        };
      });
      
      animationFrameId = requestAnimationFrame(followMouse);
    };
    
    if (isVisible) {
      followMouse();
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, isVisible]);

  // Don't render cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Inner small dot */}
      <div 
        className={`${styles.cursorDot} ${isHovering ? styles.dotHover : ''}`}
        style={{ 
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)` 
        }}
      />
      
      {/* Outer transparent ring */}
      <div 
        className={`${styles.cursorRing} ${isHovering ? styles.ringHover : ''}`}
        style={{ 
          transform: `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)` 
        }}
      />
    </>
  );
}
