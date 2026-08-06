import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>Timeless.</Link>
          <p className={styles.tagline}>
            Timeless style for every moment. Premium quality clothing for modern lifestyles.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="Pinterest">PI</a>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h3>Shop</h3>
          <ul>
            <li><Link href="/shop?category=women">Women</Link></li>
            <li><Link href="/shop?category=men">Men</Link></li>
            <li><Link href="/shop?category=new-arrivals">New Arrivals</Link></li>
            <li><Link href="/shop?category=accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3>Customer Care</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/size-guide">Size Guide</Link></li>
            <li><Link href="/shipping">Shipping & Returns</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3>Information</h3>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>

        <div className={styles.newsletterCol}>
          <h3>Newsletter</h3>
          <p>Subscribe to get updates on new arrivals and exclusive offers.</p>
          <form className={styles.subscribeForm}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </form>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>&copy; {new Date().getFullYear()} Timeless. All rights reserved.</p>
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
