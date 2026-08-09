"use client";

import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // A cinematic, premium fixed loading duration that guarantees the effect is seen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.preloader} ${!isLoading ? styles.hidden : ''}`}>
      <div className={styles.background}></div>
      <div className={styles.overlay}></div>
      <div className={styles.logoContainer}>
        <img src="/images/logo.PNG" alt="Timeless Logo" className={styles.logoImage} />
      </div>
    </div>
  );
}
