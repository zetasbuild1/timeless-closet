"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import MiniCart from './MiniCart';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    
    // Open cart just before animation finishes
    setTimeout(() => {
      setIsCartOpen(true);
    }, 400); 
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const isActive = (href: string) => {
    if (!pathname) return false;
    
    // Split href into path and query
    const [path, query] = href.split('?');
    
    // Check path
    if (pathname !== path) return false;
    
    // If href has no query, but current URL does, it shouldn't be active (e.g., /shop vs /shop?gender=women)
    if (!query) {
      return searchParams ? searchParams.toString() === '' : true;
    }
    
    // Check if query params match
    const urlParams = new URLSearchParams(query);
    let allMatch = true;
    urlParams.forEach((value, key) => {
      if (searchParams?.get(key) !== value) {
        allMatch = false;
      }
    });
    
    return allMatch;
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          Timeless.
        </Link>
        
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
          <li><Link href="/" className={isActive('/') ? styles.active : ''} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link href="/shop" className={isActive('/shop') ? styles.active : ''} onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
          <li><Link href="/shop?gender=women" className={isActive('/shop?gender=women') ? styles.active : ''} onClick={() => setIsMenuOpen(false)}>Women</Link></li>
          <li><Link href="/shop?gender=men" className={isActive('/shop?gender=men') ? styles.active : ''} onClick={() => setIsMenuOpen(false)}>Men</Link></li>
          <li><Link href="/shop?new=true" className={isActive('/shop?new=true') ? styles.active : ''} onClick={() => setIsMenuOpen(false)}>New Arrivals</Link></li>
          <li><Link href="/about" className={isActive('/about') ? styles.active : ''} onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link href="/contact" className={isActive('/contact') ? styles.active : ''} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
        
        <div className={styles.navIcons}>
          <button 
            aria-label="Cart" 
            className={`${styles.cartIcon} ${isAnimating ? styles.cartAnimating : ''}`}
            onClick={handleCartClick}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span className={`${styles.cartBadge} ${isAnimating ? styles.badgeBounce : ''}`}>0</span>
          </button>
          
          <button 
            className={styles.hamburger} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
