import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logoLink}>
            <img src="/images/logo.PNG" alt="Timeless Logo" className={styles.logoImage} />
          </Link>
          <p className={styles.tagline}>
            Timeless style for every moment. Premium quality clothing for modern lifestyles.
          </p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/share/198XBjEPzz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/timeless_closetsl?igsh=MTdvOWE0Ymo5dHA5cw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://wa.me/94768678104?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.01 2.01c-5.5 0-9.99 4.49-9.99 9.99 0 1.95.56 3.78 1.54 5.34L2.2 21.8l4.63-1.22c1.51.91 3.28 1.43 5.17 1.43 5.5 0 9.99-4.49 9.99-9.99S17.51 2.01 12.01 2.01zm5.35 14.34c-.23.65-1.34 1.25-1.85 1.32-.47.07-1.12.18-3.15-.66-2.45-1.02-4.04-3.52-4.16-3.69-.12-.16-1-1.33-1-2.54s.63-1.81.86-2.05c.22-.24.47-.3.63-.3h.43c.16 0 .37-.06.57.43.2.49.71 1.73.77 1.85.06.12.1.27.02.43-.08.16-.12.27-.24.41-.12.14-.25.32-.35.42-.12.12-.25.26-.11.5.14.25.61 1.01 1.3 1.63.89.8 1.63 1.05 1.87 1.17.24.12.37.1.51-.06.14-.16.6-1 .76-1.34.16-.34.32-.28.53-.2.2.08 1.28.61 1.5.72.22.11.37.16.42.25.07.09.07.51-.16 1.16z" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h3><Link href="/shop">Shop</Link></h3>
          <ul>
            <li><Link href="/shop?gender=women">Women</Link></li>
            <li><Link href="/shop?gender=men">Men</Link></li>
            <li><Link href="/shop?new=true">New Arrivals</Link></li>
            <li><Link href="/shop?category=accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3><Link href="/contact">Customer Care</Link></h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/size-guide">Size Guide</Link></li>
            <li><Link href="/shipping">Shipping & Returns</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3><Link href="/privacy">Information</Link></h3>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>


      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>&copy; 2026 Designed and Developed by <a href="https://www.zetasbuild.com/" target="_blank" rel="noreferrer" className={styles.zetasLink}>ZetasBuild</a>. All Rights Reserved</p>
          <div className={styles.payments}>
            <span>VISA</span>
            <span>MasterCard</span>
            <span>AMEX</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
