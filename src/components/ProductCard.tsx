"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import QuickAddButton from './QuickAddButton';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(product.id));

    const updateWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.includes(product.id));
    };

    window.addEventListener('wishlistUpdated', updateWishlist);
    window.addEventListener('storage', updateWishlist);
    return () => {
      window.removeEventListener('wishlistUpdated', updateWishlist);
      window.removeEventListener('storage', updateWishlist);
    };
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      const newWishlist = wishlist.filter((item: string) => item !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setIsWishlisted(false);
    } else {
      wishlist.push(product.id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const isOutOfStock = product.inStock === false;

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={`${styles.imageContainer} ${isOutOfStock ? styles.outOfStockImage : ''}`}>
        <img src={product.image} alt={product.name} className={styles.primaryImage} loading="lazy" />
        <img src={product.hoverImage || product.image} alt={product.name} className={styles.secondaryImage} loading="lazy" />
        
        {isOutOfStock ? (
          <span className={`${styles.badge} ${styles.badgeOutOfStock}`}>Sold Out</span>
        ) : (
          <>
            {product.isNew && <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>}
            {product.isOnSale && <span className={`${styles.badge} ${styles.badgeSale}`}>-30%</span>}
          </>
        )}
        
        <div className={styles.actions}>
          {!isOutOfStock && <QuickAddButton className={styles.quickAddBtn} />}
          <button 
            className={styles.actionBtn} 
            aria-label="Add to Wishlist"
            onClick={toggleWishlist}
          >
            <svg width="20" height="20" fill={isWishlisted ? "var(--color-primary)" : "none"} stroke={isWishlisted ? "var(--color-primary)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {(product.rating || product.reviews) ? (
          <div className={styles.ratingRow}>
             {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill={product.rating && star <= product.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={product.rating && star <= product.rating ? styles.starFilled : styles.starEmpty}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
             ))}
             {product.reviews && <span className={styles.reviewCount}>({product.reviews})</span>}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
