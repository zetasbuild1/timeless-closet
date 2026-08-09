import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import FeaturesBar from "@/components/FeaturesBar";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import ScrollReveal from "@/components/ScrollReveal";
import { products } from "@/data/products";

const row1Categories = [
  { name: 'Women', image: '/images/products/floral-print-mini-dress1.webp', link: '/shop?gender=women' },
  { name: 'Men', image: '/images/products/mens-olive-stripe-short-sleeve-shirt1.webp', link: '/shop?gender=men' },
];

const row2Categories = [
  { name: 'Dresses', image: '/images/products/peacock-stripe-long-dress1.webp', link: '/shop?category=dresses' },
  { name: 'Shirts', image: '/images/products/blue-printed-shirt1.webp', link: '/shop?category=shirts' },
  { name: 'Pants', image: '/images/products/the-outline-pant1.webp', link: '/shop?category=pants' },
  { name: 'T-Shirts', image: '/images/products/navy-and-green-stripe-t-shirt1.webp', link: '/shop?category=t-shirts' },
  { name: 'Tops', image: '/images/products/purple-cutwork-top1.webp', link: '/shop?category=tops' },
];

export default function Home() {
  const newArrivals = [...products].filter(p => p.isNew).reverse().slice(0, 4);
  const bestSellers = [...products].filter(p => p.isBestSeller).reverse().slice(0, 4);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <HeroSlider />

      {/* Shop by Category - Two Rows */}
      <ScrollReveal as="section" className={styles.categorySection}>
        <div className={styles.categoryGrid}>
          {row1Categories.map((cat, idx) => (
            <Link key={`row1-${idx}`} href={cat.link} className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper}>
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryName}>{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.categoryGrid}>
          {row2Categories.map((cat, idx) => (
            <Link key={`row2-${idx}`} href={cat.link} className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper}>
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryName}>{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* New Arrivals */}
      <ScrollReveal as="section" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>New Arrivals</h2>
            <p className={styles.sectionSubtitle}>Fresh styles just in</p>
          </div>
          <Link href="/shop?category=new-arrivals" className={styles.viewAll}>VIEW ALL</Link>
        </div>
        <div className={styles.productGrid}>
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollReveal>

      {/* Sale Banner */}
      <ScrollReveal as="section" className="container">
        <div className={styles.saleBanner}>
          <div className={styles.saleContent}>
            <span className={styles.saleTag}>SUMMER SALE</span>
            <h2 className={styles.saleTitle}>Up to 30% Off</h2>
            <p className={styles.saleSubtitle}>On selected items</p>
            <Link href="/shop?sale=true" className="btn btn-secondary">SHOP NOW</Link>
          </div>
          <div className={styles.saleImageWrapper}>
            <img src="/images/products/peacock-stripe-long-dress1.webp" alt="Summer Sale" loading="lazy" />
          </div>
        </div>
      </ScrollReveal>



      {/* Best Sellers */}
      <ScrollReveal as="section" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Best Sellers</h2>
            <p className={styles.sectionSubtitle}>Customer favorites</p>
          </div>
          <Link href="/shop?sort=popular" className={styles.viewAll}>VIEW ALL</Link>
        </div>
        <div className={styles.productGrid}>
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollReveal>

      {/* Features Bar */}
      <ScrollReveal>
        <FeaturesBar />
      </ScrollReveal>
    </main>
  );
}
