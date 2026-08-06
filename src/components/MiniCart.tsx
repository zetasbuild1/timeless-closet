"use client";
import styles from './MiniCart.module.css';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={onClose} 
      />
      <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Your Cart (0)</h2>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close Cart">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className={styles.body}>
          <p className={styles.emptyMsg}>Your cart is currently empty.</p>
        </div>
        <div className={styles.footer}>
          <button className={styles.checkoutBtn} disabled>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
}
