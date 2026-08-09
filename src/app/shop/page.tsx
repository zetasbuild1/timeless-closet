"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./Shop.module.css";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const genderParam = searchParams?.get('gender');
  const newParam = searchParams?.get('new');
  const saleParam = searchParams?.get('sale');

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.includes('All') || selectedCategories.includes(product.category);
    const matchesPrice = product.price <= maxPrice;
    const matchesSize = selectedSizes.length === 0 || (product.sizes && selectedSizes.some(s => product.sizes!.includes(s)));
    const matchesColor = selectedColors.length === 0 || (product.colors && selectedColors.some(c => product.colors!.includes(c)));
    
    // Query param filters
    const matchesGender = !genderParam || product.gender?.toLowerCase() === genderParam;
    const matchesNew = !newParam || product.isNew === true;
    const matchesSale = !saleParam || !!product.originalPrice;

    return matchesCategory && matchesPrice && matchesSize && matchesColor && matchesGender && matchesNew && matchesSale;
  });

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, maxPrice, selectedSizes, selectedColors]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const categories = [
    { name: 'All', count: products.length },
    { name: 'Tops', count: products.filter(p => p.category === 'Tops').length },
    { name: 'T-Shirts', count: products.filter(p => p.category === 'T-Shirts').length },
    { name: 'Shirts', count: products.filter(p => p.category === 'Shirts').length },
    { name: 'Dresses', count: products.filter(p => p.category === 'Dresses').length },
    { name: 'Jeans', count: products.filter(p => p.category === 'Jeans').length },
    { name: 'Jackets', count: products.filter(p => p.category === 'Jackets').length },
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '2', '4', '6', 'UK8', 'UK10', 'UK12'];
  const colors = ['#000000', '#ffffff', '#e0d8d0', '#546e7a', '#b71c1c', '#388e3c'];

  const toggleCategory = (catName: string) => {
    if (catName === 'All') {
      setSelectedCategories(['All']);
      return;
    }
    let newCats = selectedCategories.filter(c => c !== 'All');
    if (newCats.includes(catName)) {
      newCats = newCats.filter(c => c !== catName);
    } else {
      newCats.push(catName);
    }
    if (newCats.length === 0) newCats = ['All'];
    setSelectedCategories(newCats);
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div className={`container ${styles.shopPage}`}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <span className={styles.separator}>›</span>
        <span>Shop</span>
        {(genderParam || newParam || saleParam) && (
          <>
            <span className={styles.separator}>›</span>
            <span style={{ textTransform: 'capitalize' }}>
              {genderParam || (newParam ? 'New Arrivals' : 'Sale')}
            </span>
          </>
        )}
      </div>

      <div className={styles.shopContainer}>
        {/* Sidebar Filters */}
        <div className={`${styles.sidebarOverlay} ${isMobileFiltersOpen ? styles.overlayOpen : ''}`} onClick={() => setIsMobileFiltersOpen(false)}></div>
        <aside className={`${styles.sidebar} ${isMobileFiltersOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h2>Filters</h2>
            <button className={styles.closeFiltersBtn} onClick={() => setIsMobileFiltersOpen(false)}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <ul className={styles.categoryList}>
              {categories.map(cat => (
                <li key={cat.name}>
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => toggleCategory(cat.name)}
                    />
                    <span>{cat.name} ({cat.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Price</h3>
            <div className={styles.priceRange}>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className={styles.nativeRange}
              />
              <div className={styles.priceInputs}>
                <span>LKR 0 - LKR {maxPrice.toLocaleString()}</span>
                <button className={styles.filterBtn}>FILTER</button>
              </div>
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Size</h3>
            <div className={styles.sizeList}>
              {sizes.map(size => (
                <label key={size} className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>


        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.topBar}>
            <div className={styles.mobileFilterRow}>
              <h1 className={styles.pageTitle}>
                {genderParam ? `${genderParam.charAt(0).toUpperCase() + genderParam.slice(1)}'s Collection` : 
                 newParam ? 'New Arrivals' : 
                 saleParam ? 'Sale' : 
                 'Shop All'}
              </h1>
              <button 
                className={styles.mobileFilterBtn}
                onClick={() => setIsMobileFiltersOpen(true)}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Filters
              </button>
            </div>
            <div className={styles.sortControls}>
              <span className={styles.showingText}>
                {filteredProducts.length === 0 
                  ? "No results found" 
                  : `Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredProducts.length)} of ${filteredProducts.length} results`}
              </span>
              <div className={styles.sortDropdown}>
                <label>Sort by:</label>
                <select>
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.productGrid}>
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1}
                  className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ''}`}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {i + 1}
                </button>
              ))}
              {currentPage < totalPages && (
                <button 
                  className={styles.pageBtn}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  ›
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
