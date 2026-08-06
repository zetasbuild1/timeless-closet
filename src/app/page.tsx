import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import FeaturesBar from "@/components/FeaturesBar";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import ScrollReveal from "@/components/ScrollReveal";
import { products } from "@/data/products";

const categories = [
  { name: 'Women', count: '120+', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop', link: '/shop?category=women' },
  { name: 'Men', count: '150+', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop', link: '/shop?category=men' },
  { name: 'Dresses', count: '80+', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop', link: '/shop?category=dresses' },
  { name: 'T-Shirts', count: '100+', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop', link: '/shop?category=t-shirts' },
  { name: 'Accessories', count: '60+', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop', link: '/shop?category=accessories' },
];

export default function Home() {
  const newArrivals = [...products].filter(p => p.isNew).reverse().slice(0, 4);
  const bestSellers = [...products].filter(p => p.isBestSeller).reverse().slice(0, 4);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <HeroSlider />

      {/* Shop by Category */}
      <ScrollReveal as="section" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
          </div>
          <Link href="/shop" className={styles.viewAll}>VIEW ALL</Link>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.link} className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper}>
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <div className={styles.categoryName}>{cat.name}</div>
              <div className={styles.categoryCount}>{cat.count} items</div>
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
            <span className={styles.saleTag}>Summer Sale</span>
            <h2 className={styles.saleTitle}>Up to 30% Off</h2>
            <p className={styles.saleSubtitle}>On selected items</p>
            <Link href="/shop?sale=true">
              <Button variant="secondary" size="lg">SHOP NOW</Button>
            </Link>
          </div>
          <div className={styles.saleImageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Sale" 
              loading="lazy"
            />
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
