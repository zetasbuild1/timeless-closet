"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Checkout.module.css";
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

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    setIsLoaded(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; 
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <div className={`container ${styles.checkoutPage}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.steps}>
          <Link href="/cart" className={styles.step}>Cart</Link>
          <span className={styles.stepSeparator}>—</span>
          <span className={styles.activeStep}>Checkout</span>
          <span className={styles.stepSeparator}>—</span>
          <span className={styles.step}>Complete</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.formsSection}>
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter phone number" />
              </div>
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Shipping Address</h2>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Address</label>
              <input type="text" placeholder="Street Address" />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>City</label>
                <input type="text" placeholder="City" />
              </div>
              <div className={styles.formGroup}>
                <label>Postal Code</label>
                <input type="text" placeholder="Postal Code" />
              </div>
              <div className={styles.formGroup}>
                <label>Country</label>
                <select>
                  <option>Sri Lanka</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className={styles.summaryItems}>
              {cartItems.length === 0 ? (
                <p style={{ color: 'var(--color-text-light)', padding: '1rem 0' }}>Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className={styles.summaryItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemMeta}>Size: {item.size} | Qty: {item.quantity}</span>
                    </div>
                    <div className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))
              )}
            </div>

            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className={styles.paymentSection}>
              <h3 className={styles.paymentTitle}>Payment Method</h3>
              <div className={styles.paymentOptions}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="payment" defaultChecked />
                  <span>Credit / Debit Card</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="payment" />
                  <span>Bank Transfer</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="payment" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            <Button variant="primary" size="lg" fullWidth disabled={cartItems.length === 0}>
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
