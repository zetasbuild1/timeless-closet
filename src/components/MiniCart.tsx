"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './MiniCart.module.css';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    window.addEventListener('storage', loadCart);
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
      window.removeEventListener('storage', loadCart);
    };
  }, []);

  const removeItem = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={onClose} 
      />
      <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Your Cart ({cartCount})</h2>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close Cart">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className={styles.body} style={{ display: 'block' }}>
          {cartItems.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p className={styles.emptyMsg}>Your cart is currently empty.</p>
            </div>
          ) : (
            <div className={styles.cartList}>
              {cartItems.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}-${index}`} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <Link href={`/product/${item.productId}`} className={styles.itemTitle} onClick={onClose}>
                      {item.name}
                    </Link>
                    <div className={styles.itemMeta}>
                      Size: {item.size} | Color: 
                      <span style={{ backgroundColor: item.color, display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', marginLeft: '4px', border: '1px solid #ccc' }}></span>
                    </div>
                    <div className={styles.itemPriceQty}>
                      <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                      <span className={styles.itemQty}>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(index)} aria-label="Remove item">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.footer}>
          {cartItems.length > 0 && (
            <div className={styles.subtotal}>
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          )}
          <button 
            className={styles.checkoutBtn} 
            disabled={cartItems.length === 0}
            onClick={() => {
              onClose();
              router.push('/checkout');
            }}
          >
            {cartItems.length === 0 ? 'Proceed to Checkout' : 'Checkout'}
          </button>
          {cartItems.length > 0 && (
             <button 
             className={styles.checkoutBtn} 
             style={{ backgroundColor: 'transparent', color: 'var(--color-text-main)', border: '1px solid var(--color-text-main)', marginTop: '10px' }}
             onClick={() => {
               onClose();
               router.push('/cart');
             }}
           >
             View Cart
           </button>
          )}
        </div>
      </div>
    </>
  );
}
