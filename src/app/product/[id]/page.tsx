"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import styles from "./ProductDetail.module.css";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ScrollReveal";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find(p => p.id === id) || products[0];

  const defaultSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const defaultColors = ['#000000', '#e0d8d0', '#546e7a'];
  
  const productSizes = product.sizes && product.sizes.length > 0 ? product.sizes : defaultSizes;
  const productColors = product.colors && product.colors.length > 0 ? product.colors : defaultColors;

  const [selectedSize, setSelectedSize] = useState<string>(productSizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(productColors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  
  // Use product images if available, otherwise fallback
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [
        product.image,
        product.hoverImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80'
      ];

  const [currentImage, setCurrentImage] = useState<string>(galleryImages[0]);
  const [nextImage, setNextImage] = useState<string | null>(null);

  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });
  
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    // Check wishlist status on mount
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlist.includes(id)) {
      setIsWishlisted(true);
    }
  }, [id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      const newWishlist = wishlist.filter((item: string) => item !== id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setIsWishlisted(false);
    } else {
      wishlist.push(id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newItem = {
      productId: id,
      size: selectedSize,
      color: selectedColor,
      quantity,
      price: product.price,
      name: product.name,
      image: product.image
    };
    
    // Check if exact variant exists
    const existingIndex = cart.findIndex((item: any) => 
      item.productId === id && item.size === selectedSize && item.color === selectedColor
    );
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(newItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleThumbnailClick = (img: string, i: number) => {
    if (img === currentImage || nextImage) return;
    setActiveImageIndex(i);
    setNextImage(img);
    setTimeout(() => {
      setCurrentImage(img);
      setNextImage(null);
    }, 400); // 400ms crossfade duration
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsZooming(true);
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Clamp to boundaries so lens doesn't overflow completely
    const clampedX = Math.max(0, Math.min(x, width));
    const clampedY = Math.max(0, Math.min(y, height));

    setLensPos({
      x: clampedX,
      y: clampedY,
      bgX: (clampedX / width) * 100,
      bgY: (clampedY / height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  return (
    <div className={`container ${styles.productPage}`}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <span className={styles.separator}>›</span>
        <Link href={`/shop?category=${product.category.toLowerCase()}`}>{product.category}</Link>
        <span className={styles.separator}>›</span>
        <span>{product.name}</span>
      </div>

      <ScrollReveal className={styles.content}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {galleryImages.map((img, i) => (
              <div 
                key={i} 
                className={`${styles.thumbnail} ${i === activeImageIndex ? styles.activeThumb : ''}`}
                onClick={() => handleThumbnailClick(img, i)}
              >
                <img src={img} alt={`Thumbnail ${i}`} loading="lazy" />
              </div>
            ))}
          </div>
          <div 
            className={`${styles.mainImage} ${isZooming ? styles.zooming : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Crossfade Images */}
            <img 
              src={currentImage} 
              alt={product.name} 
              className={`${styles.mainImg} ${nextImage ? styles.fadeOut : ''}`}
            />
            {nextImage && (
              <img 
                src={nextImage} 
                alt={product.name} 
                className={`${styles.mainImg} ${styles.fadeIn}`}
              />
            )}
            
            {/* Lens Effect */}
            {isZooming && (
              <div 
                className={styles.lens}
                style={{
                  left: lensPos.x - 75,
                  top: lensPos.y - 75,
                  backgroundImage: `url(${nextImage || currentImage})`,
                  backgroundPosition: `${lensPos.bgX}% ${lensPos.bgY}%`
                }}
              />
            )}
          </div>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} width="16" height="16" fill={star <= (product.rating || 5) ? "#f59e0b" : "#e5e7eb"} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className={styles.reviewCount}>({product.reviews || 0} reviews)</span>
          </div>

          <p className={styles.description}>
            {product.description || `Beautiful ${product.name.toLowerCase()} perfect for summer days. Made with lightweight fabric for ultimate comfort.`}
          </p>

          <div className={styles.selector}>
            <span className={styles.selectorLabel}>Size</span>
            <div className={styles.options}>
              {productSizes.map(size => (
                <button 
                  key={size} 
                  className={`${styles.optionBtn} ${size === selectedSize ? styles.activeOption : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.selector}>
            <span className={styles.selectorLabel}>Color</span>
            <div className={styles.options}>
              {productColors.map(color => (
                <button 
                  key={color} 
                  className={`${styles.colorBtn} ${color === selectedColor ? styles.activeColor : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Color ${color}`}
                ></button>
              ))}
            </div>
          </div>

          <div className={styles.selector}>
            <span className={styles.selectorLabel}>Quantity</span>
            <div className={styles.quantity}>
              <button className={styles.qtyBtn} onClick={decreaseQty}>-</button>
              <input type="number" value={quantity} readOnly className={styles.qtyInput} />
              <button className={styles.qtyBtn} onClick={increaseQty}>+</button>
            </div>
          </div>

          <div className={styles.actions}>
            <div style={{ flex: 1 }}>
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                onClick={addToCart}
                style={{ backgroundColor: isAdded ? '#10b981' : undefined, borderColor: isAdded ? '#10b981' : undefined }}
              >
                {isAdded ? 'ADDED TO CART ✓' : 'ADD TO CART'}
              </Button>
            </div>
            <div style={{ flex: 1 }}>
              <Link href="/checkout" onClick={(e) => { if(!isAdded) addToCart(); }}>
                <Button variant="outline" size="lg" fullWidth>BUY NOW</Button>
              </Link>
            </div>
          </div>

          <button className={styles.wishlistBtn} onClick={toggleWishlist}>
            <svg 
              width="20" 
              height="20" 
              fill={isWishlisted ? "var(--color-primary)" : "none"} 
              stroke={isWishlisted ? "var(--color-primary)" : "currentColor"} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ transition: 'all 0.2s ease' }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
          </button>

          {/* Accordions */}
          <div className={styles.accordionContainer}>
            <details className={styles.accordion} open>
              <summary className={styles.accordionHeader}>Product Details</summary>
              <div className={styles.accordionContent}>
                <ul className={styles.detailList}>
                  {product.details ? (
                    product.details.map((detail, index) => <li key={index}>{detail}</li>)
                  ) : (
                    <>
                      <li>100% Premium Cotton</li>
                      <li>Lightweight & Breathable</li>
                      <li>Floral Print Design</li>
                      <li>Machine Wash Cold</li>
                    </>
                  )}
                </ul>
              </div>
            </details>
            <details className={styles.accordion}>
              <summary className={styles.accordionHeader}>Shipping & Returns</summary>
              <div className={styles.accordionContent}>
                <p>Free delivery for orders over LKR 7,000</p>
                <p>14-day easy returns</p>
                <p>Ships within 1-2 business days</p>
              </div>
            </details>
          </div>

        </div>
      </ScrollReveal>
    </div>
  );
}
