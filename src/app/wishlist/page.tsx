"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import styles from "./Wishlist.module.css";

export default function WishlistPage() {
  const { products } = useProducts();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const items = savedWishlist.map((id: string) => products.find(p => p.id === id)).filter(Boolean);
      setWishlistItems(items);
      setIsLoaded(true);
    };

    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    window.addEventListener('storage', loadWishlist);
    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
      window.removeEventListener('storage', loadWishlist);
    };
  }, [products]);

  if (!isLoaded) return null;

  return (
    <div className={`container ${styles.wishlistPage}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Wishlist</h1>
        <p className={styles.subtitle}>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Your wishlist is empty</h2>
          <p>Save items you love to your wishlist to easily find them later.</p>
          <Link href="/shop">
            <Button variant="primary">Explore Collection</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
