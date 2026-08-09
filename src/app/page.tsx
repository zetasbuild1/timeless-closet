import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import FeaturesBar from "@/components/FeaturesBar";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import ScrollReveal from "@/components/ScrollReveal";
import { products } from "@/data/products";

const categories = [
  { name: 'Women', image: '/images/products/floral-print-mini-dress1.webp', link: '/shop?category=women' },
  { name: 'Men', image: '/images/products/mens-olive-stripe-short-sleeve-shirt1.webp', link: '/shop?category=men' },
  { name: 'Dresses', image: '/images/products/floral-peplum-top1.webp', link: '/shop?category=dresses' },
  { name: 'Shirts', image: '/images/products/blue-printed-shirt1.webp', link: '/shop?category=shirts' },
];

export default function Home() {
  const newArrivals = [...products].filter(p => p.isNew).reverse().slice(0, 4);
  const bestSellers = [...products].filter(p => p.isBestSeller).reverse().slice(0, 4);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <HeroSlider />

      {/* Shop by Category - Accordion */}
      <ScrollReveal as="section" className={styles.categorySection}>
        <div className={styles.categoryGrid}>
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.link} className={styles.categoryCard}>
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
