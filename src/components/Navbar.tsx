"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          Timeless.
        </Link>
        
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
          <li><Link href="/shop?gender=women" onClick={() => setIsMenuOpen(false)}>Women</Link></li>
          <li><Link href="/shop?gender=men" onClick={() => setIsMenuOpen(false)}>Men</Link></li>
          <li><Link href="/shop?new=true" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link></li>
          <li><Link href="/shop?sale=true" onClick={() => setIsMenuOpen(false)}>Sale</Link></li>
          <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
        
        <div className={styles.navIcons}>
          <button aria-label="Search">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button aria-label="Profile">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
          <Link href="/cart" aria-label="Cart" className={styles.cartIcon}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span className={styles.cartBadge}>0</span>
          </Link>
          
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
    </nav>
  );
}
