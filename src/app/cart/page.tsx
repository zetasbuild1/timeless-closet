"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Cart.module.css";
import Button from "@/components/ui/Button";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    setIsLoaded(true);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cartItems];
    const newQty = newCart[index].quantity + delta;
    if (newQty > 0) {
      newCart[index].quantity = newQty;
      updateCart(newCart);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isLoaded) return null;

  return (
    <div className={`container ${styles.cartPage}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <div className={styles.steps}>
          <span className={styles.activeStep}>Cart</span>
          <span className={styles.stepSeparator}>—</span>
          <span className={styles.step}>Checkout</span>
          <span className={styles.stepSeparator}>—</span>
          <span className={styles.step}>Complete</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)', fontSize: '1.5rem' }}>Your cart is empty</h2>
              <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
              <Link href="/shop">
                <Button variant="primary">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.tableHeader}>
                <div className={styles.colProduct}>Product</div>
                <div className={styles.colPrice}>Price</div>
                <div className={styles.colQty}>Quantity</div>
                <div className={styles.colSubtotal}>Subtotal</div>
              </div>

              {cartItems.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}-${index}`} className={styles.cartItem}>
                  <div className={styles.itemProduct}>
                    <button className={styles.removeBtn} aria-label="Remove item" onClick={() => removeItem(index)}>✕</button>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemDetails}>
                      <Link href={`/product/${item.productId}`} className={styles.itemName}>{item.name}</Link>
                      <span className={styles.itemMeta}>Size: {item.size} | Color: <span className={styles.colorSwatch} style={{backgroundColor: item.color, display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', verticalAlign: 'middle', marginLeft: '4px', border: '1px solid #ccc'}}></span></span>
                    </div>
                  </div>
                  <div className={styles.colPrice}>{formatPrice(item.price)}</div>
                  <div className={styles.colQty}>
                    <div className={styles.quantity}>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(index, -1)}>-</button>
                      <input type="number" value={item.quantity} readOnly className={styles.qtyInput} />
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(index, 1)}>+</button>
                    </div>
                  </div>
                  <div className={styles.colSubtotal}>{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className={styles.summaryContainer}>
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" style={{ pointerEvents: cartItems.length === 0 ? 'none' : 'auto' }}>
              <Button variant="primary" size="lg" fullWidth className={styles.checkoutBtn} disabled={cartItems.length === 0}>
                PROCEED TO CHECKOUT
              </Button>
            </Link>
            <div className={styles.continueShopping}>
              <Link href="/shop">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
