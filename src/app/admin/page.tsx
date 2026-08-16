"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/data/products';
import ProductFormModal from '@/components/admin/ProductFormModal';
import styles from './Admin.module.css';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    toggleStockStatus,
    resetProducts,
    importProducts,
  } = useProducts();

  // Authentication check
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('/api/admin/check');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            return;
          }
        }
        router.push('/admin/login');
      } catch {
        router.push('/admin/login');
      }
    };
    verifyAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      showToast('Signed out successfully');
      setTimeout(() => {
        router.push('/admin/login');
      }, 400);
    } catch {
      router.push('/admin/login');
    }
  };

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Women' | 'Men' | 'Unisex'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'inStock' | 'outOfStock' | 'new' | 'bestSeller' | 'sale'>('All');
  const [sortBy, setSortBy] = useState<'id-desc' | 'id-asc' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc' | 'reviews-desc'>('id-desc');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Delete confirmation
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset confirmation
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // JSON Import / Export
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Firebase status
  const [firebaseStatus, setFirebaseStatus] = useState<{
    configured: boolean;
    connected?: boolean;
    projectId?: string | null;
    message?: string;
    firestoreCount?: number;
  }>({ configured: false });
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [isSyncingFirebase, setIsSyncingFirebase] = useState(false);

  const checkFirebaseStatus = () => {
    fetch('/api/admin/firebase-status')
      .then(res => res.json())
      .then(data => setFirebaseStatus(data))
      .catch(() => setFirebaseStatus({ configured: false }));
  };

  useEffect(() => {
    checkFirebaseStatus();
  }, []);

  const handleSyncToFirestore = async () => {
    try {
      setIsSyncingFirebase(true);
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products),
      });
      if (res.ok) {
        showToast('Successfully synced all products to Firestore!');
        checkFirebaseStatus();
      } else {
        showToast('Sync failed. Check your Firebase credentials.', 'error');
      }
    } catch {
      showToast('Error syncing products to Firestore', 'error');
    } finally {
      setIsSyncingFirebase(false);
    }
  };

  // Toast notifications
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'error' }[]>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = String(Date.now());
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Distinct categories
  const categoriesList = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        product.name.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query);

      // Category match
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;

      // Gender match
      const matchesGender = genderFilter === 'All' || product.gender === genderFilter;

      // Status match
      let matchesStatus = true;
      if (statusFilter === 'inStock') matchesStatus = product.inStock !== false;
      if (statusFilter === 'outOfStock') matchesStatus = product.inStock === false;
      if (statusFilter === 'new') matchesStatus = !!product.isNew;
      if (statusFilter === 'bestSeller') matchesStatus = !!product.isBestSeller;
      if (statusFilter === 'sale') matchesStatus = !!product.originalPrice;

      return matchesSearch && matchesCategory && matchesGender && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'reviews-desc') return (b.reviews || 0) - (a.reviews || 0);
      if (sortBy === 'id-asc') return Number(a.id) - Number(b.id);
      return Number(b.id) - Number(a.id); // id-desc default
    });
  }, [products, searchQuery, categoryFilter, genderFilter, statusFilter, sortBy]);

  // Key stats
  const stats = useMemo(() => {
    const total = products.length;
    const inStockCount = products.filter(p => p.inStock !== false).length;
    const outOfStockCount = products.filter(p => p.inStock === false).length;
    const womenCount = products.filter(p => p.gender === 'Women').length;
    const menCount = products.filter(p => p.gender === 'Men').length;
    const saleCount = products.filter(p => !!p.originalPrice).length;
    const totalValue = products.reduce((acc, p) => acc + p.price, 0);
    return { total, inStockCount, outOfStockCount, womenCount, menCount, saleCount, totalValue };
  }, [products]);

  const handleToggleStock = async (prod: Product) => {
    const currentInStock = prod.inStock !== false;
    await toggleStockStatus(prod.id);
    showToast(`Marked "${prod.name}" as ${!currentInStock ? 'In Stock' : 'Out of Stock'}`);
  };

  // Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (productData: any) => {
    if (editingProduct) {
      const updated = await updateProduct(editingProduct.id, productData);
      if (updated) {
        showToast(`Updated "${updated.name}" successfully!`);
      } else {
        showToast('Failed to update product', 'error');
      }
    } else {
      const created = await addProduct(productData);
      if (created) {
        showToast(`Created "${created.name}" successfully!`);
      } else {
        showToast('Failed to create product', 'error');
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      setIsDeleting(true);
      const success = await deleteProduct(deletingProduct.id);
      if (success) {
        showToast(`Deleted "${deletingProduct.name}" successfully!`);
      } else {
        showToast('Could not delete product', 'error');
      }
    } catch {
      showToast('Error deleting product', 'error');
    } finally {
      setIsDeleting(false);
      setDeletingProduct(null);
    }
  };

  const handleConfirmReset = async () => {
    try {
      setIsResetting(true);
      const success = await resetProducts();
      if (success) {
        showToast('Catalog reset to default 13 items successfully!');
      } else {
        showToast('Failed to reset catalog', 'error');
      }
    } finally {
      setIsResetting(false);
      setIsResetConfirmOpen(false);
    }
  };

  const handleStatusToggle = async (prod: Product, field: 'isNew' | 'isBestSeller') => {
    await toggleProductStatus(prod.id, field);
    showToast(`Updated ${field === 'isNew' ? 'New Arrival' : 'Best Seller'} status for "${prod.name}"`);
  };

  // JSON Import & Export
  const handleOpenJsonModal = () => {
    setJsonText(JSON.stringify(products, null, 2));
    setIsJsonModalOpen(true);
  };

  const handleExportFile = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `timeless-products-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported products JSON file');
  };

  const handleImportJson = async () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('JSON must be an array of products');
      }
      await importProducts(parsed);
      setIsJsonModalOpen(false);
      showToast(`Successfully imported ${parsed.length} products!`);
    } catch (err: any) {
      showToast(`Invalid JSON format: ${err.message}`, 'error');
    }
  };

  const handleFileUploadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        setJsonText(text);
      } catch (err) {
        showToast('Failed to read file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const formatPrice = (price: number) => {
    return `LKR ${price.toLocaleString()}`;
  };

  if (isAuthenticated === null) {
    return (
      <div className={styles.adminWrapper} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', fontWeight: 500 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
            <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10"/>
          </svg>
          Loading Admin Portal...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminWrapper}>
      {/* Top Navbar */}
      <header className={styles.topNav}>
        <div className={styles.topNavContainer}>
          <div className={styles.brandGroup}>
            <Link href="/" title="View Store">
              <img src="/images/logo.PNG" alt="Timeless Closet" className={styles.brandLogo} />
            </Link>
            <span className={styles.adminBadge}>Admin Portal</span>
          </div>

          <div className={styles.navActions}>
            {/* Firebase Status Badge */}
            <button
              type="button"
              className={styles.utilityBtn}
              onClick={() => setIsFirebaseModalOpen(true)}
              style={{
                background: firebaseStatus.configured ? '#f0fdf4' : '#fffbeb',
                borderColor: firebaseStatus.configured ? '#bbf7d0' : '#fde68a',
                color: firebaseStatus.configured ? '#15803d' : '#b45309',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontWeight: 600,
                fontSize: '0.82rem',
              }}
              title="Click to view Firebase Firestore connection status and setup"
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: firebaseStatus.configured ? '#16a34a' : '#f59e0b',
                  display: 'inline-block',
                }}
              />
              <span>
                {firebaseStatus.configured
                  ? `Firestore: ${firebaseStatus.projectId || 'Connected'}`
                  : 'Firebase Setup (Cloud DB)'}
              </span>
            </button>

            <Link href="/" target="_blank" className={styles.storeLinkBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              View Live Store
            </Link>

            <button type="button" className={styles.utilityBtn} onClick={handleOpenJsonModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              JSON Tools
            </button>

            <button type="button" className={styles.utilityBtn} onClick={() => setIsResetConfirmOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              Reset Seed
            </button>

            <button type="button" className={styles.primaryAddBtn} onClick={handleOpenAddModal}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Product
            </button>

            <button 
              type="button" 
              className={styles.utilityBtn} 
              onClick={handleLogout}
              title="Sign Out of Admin"
              style={{ color: '#dc2626', borderColor: '#fecaca', background: '#fef2f2' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.mainContent}>
        {/* Stats Dashboard */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Inventory</span>
              <span className={styles.statValue}>{stats.total}</span>
              <span className={styles.statSub}>Active Catalog</span>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconRed}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Women's Apparel</span>
              <span className={styles.statValue}>{stats.womenCount}</span>
              <span className={styles.statSub}>{Math.round((stats.womenCount / (stats.total || 1)) * 100)}% of stock</span>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Men's Apparel</span>
              <span className={styles.statValue}>{stats.menCount}</span>
              <span className={styles.statSub}>{Math.round((stats.menCount / (stats.total || 1)) * 100)}% of stock</span>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>On Sale Items</span>
              <span className={styles.statValue}>{stats.saleCount}</span>
              <span className={styles.statSub}>Discounted Deals</span>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconAmber}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Catalog Value</span>
              <span className={styles.statValue}>{formatPrice(stats.totalValue)}</span>
              <span className={styles.statSub}>Sum of retail prices</span>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Filter and Search Panel */}
        <section className={styles.controlPanel}>
          <div className={styles.searchRow}>
            <div className={styles.searchInputWrapper}>
              <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search products by title, category, SKU or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles.filterSelect}
            >
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={styles.filterSelect}
              >
                <option value="id-desc">Latest Added (ID High-Low)</option>
                <option value="id-asc">Oldest (ID Low-High)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="rating-desc">Highest Rated (★ 5.0 - 1.0)</option>
                <option value="reviews-desc">Most Reviews (Top Feedback)</option>
              </select>
            </div>

            <div className={styles.filtersRow}>
              {/* Gender Filters */}
              <div className={styles.pillGroup}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginRight: '4px' }}>
                  Department:
                </span>
                {(['All', 'Women', 'Men', 'Unisex'] as const).map(g => (
                  <button
                    key={g}
                    type="button"
                    className={`${styles.filterPill} ${genderFilter === g ? styles.filterPillActive : ''}`}
                    onClick={() => setGenderFilter(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Status Filters */}
              <div className={styles.pillGroup}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginRight: '4px' }}>
                  Status:
                </span>
                {[
                  { label: 'All Items', val: 'All' },
                  { label: 'In Stock', val: 'inStock' },
                  { label: 'Out of Stock', val: 'outOfStock' },
                  { label: '🔥 New Arrivals', val: 'new' },
                  { label: '⭐ Best Sellers', val: 'bestSeller' },
                  { label: '🏷️ On Sale', val: 'sale' },
                ].map(s => (
                  <button
                    key={s.val}
                    type="button"
                    className={`${styles.filterPill} ${statusFilter === s.val ? styles.filterPillActive : ''}`}
                    onClick={() => setStatusFilter(s.val as any)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className={styles.resultsCount}>
                Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> items
              </div>
            </div>
          </section>

          {/* Table of Products */}
          <section className={styles.tableCard}>
            {filteredProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <h3 className={styles.emptyTitle}>No matching products found</h3>
                <p className={styles.emptyDesc}>
                  {searchQuery || categoryFilter !== 'All' || genderFilter !== 'All' || statusFilter !== 'All'
                    ? 'Try adjusting your search criteria or resetting filters to find items.'
                    : 'Your product catalog is empty. Click "+ Add Product" to add your first product.'}
                </p>
                <button
                  type="button"
                  className={styles.primaryAddBtn}
                  onClick={handleOpenAddModal}
                >
                  + Add Product
                </button>
              </div>
            ) : (
              <div className={styles.productGrid}>
                {filteredProducts.map(product => {
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : null;

                  return (
                    <div key={product.id} className={styles.productCard}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardTitleGroup}>
                          <img
                            src={product.image || '/images/products/evergreen-shirt1.webp'}
                            alt={product.name}
                            className={styles.cardImage}
                            loading="lazy"
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <div className={styles.cardTitle} title={product.name}>{product.name}</div>
                            <div className={styles.cardId}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                              {product.id}
                            </div>
                          </div>
                        </div>
                        <div className={styles.cardBadges}>
                          <span className={styles.categoryBadge}>{product.category}</span>
                          <span className={`${styles.genderBadge} ${product.gender === 'Women' ? styles.genderWomen : product.gender === 'Men' ? styles.genderMen : styles.genderUnisex}`}>
                            {product.gender || 'Unisex'}
                          </span>
                        </div>
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.cardRow}>
                          <div className={styles.cardInfoBlock}>
                            <span className={styles.cardInfoLabel}>Price</span>
                            <span className={styles.cardInfoValue}>
                              {formatPrice(product.price)}
                              {discount && <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>(-{discount}%)</span>}
                            </span>
                          </div>
                          <div className={styles.cardInfoBlock}>
                            <span className={styles.cardInfoLabel}>Stock Status</span>
                            <button
                              type="button"
                              className={`${styles.statusPill} ${product.inStock !== false ? styles.statusPillActiveGreen : styles.statusPillActiveRed}`}
                              onClick={() => handleToggleStock(product)}
                              title="Click to toggle Stock Status"
                            >
                              {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>

                        <div className={styles.cardDivider} />

                        <div className={styles.cardRow}>
                          <div className={styles.cardInfoBlock}>
                            <span className={styles.cardInfoLabel}>Performance</span>
                            <span className={styles.cardInfoValue}>
                              <span style={{ color: '#f59e0b', fontSize: '1.05rem' }}>★</span>
                              {product.rating || 5.0} 
                              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>({product.reviews ?? 0} revs)</span>
                            </span>
                          </div>
                          <div className={styles.cardInfoBlock}>
                            <span className={styles.cardInfoLabel}>Tags</span>
                            <div className={styles.statusToggles} style={{ marginTop: '0.1rem' }}>
                              <button
                                type="button"
                                className={`${styles.statusPill} ${product.isNew ? styles.statusPillActiveRed : styles.statusPillInactive}`}
                                onClick={() => handleStatusToggle(product, 'isNew')}
                                title="Toggle New Arrival"
                                style={{ padding: '0.15rem 0.45rem' }}
                              >
                                {product.isNew ? '🔥 NEW' : 'Off'}
                              </button>
                              <button
                                type="button"
                                className={`${styles.statusPill} ${product.isBestSeller ? styles.statusPillActiveAmber : styles.statusPillInactive}`}
                                onClick={() => handleStatusToggle(product, 'isBestSeller')}
                                title="Toggle Best Seller"
                                style={{ padding: '0.15rem 0.45rem' }}
                              >
                                {product.isBestSeller ? '⭐ HOT' : 'Off'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.cardFooter}>
                        <div className={styles.btnGroup}>
                          <Link href={`/product/${product.id}`} target="_blank" className={styles.btnActionOutline} title="View in Store">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            Details
                          </Link>
                          <button type="button" className={styles.btnActionOutline} onClick={() => handleOpenEditModal(product)} title="Edit Product">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            Edit
                          </button>
                        </div>
                        <button type="button" className={styles.btnActionDanger} onClick={() => setDeletingProduct(product)} title="Delete Product">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
          )}
        </section>
      </main>

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        existingCategories={categoriesList.filter(c => c !== 'All')}
      />

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className={styles.confirmBackdrop} onClick={() => setDeletingProduct(null)}>
          <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </div>
            <div>
              <h3 className={styles.confirmTitle}>Delete Product?</h3>
              <p className={styles.confirmDesc}>
                Are you sure you want to delete <strong>"{deletingProduct.name}"</strong> (ID: #{deletingProduct.id})? This action will remove it from the catalog and cannot be undone.
              </p>
            </div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.utilityBtn}
                onClick={() => setDeletingProduct(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.deleteConfirmBtn}
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className={styles.confirmBackdrop} onClick={() => setIsResetConfirmOpen(false)}>
          <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmIcon} style={{ background: '#fef3c7', color: '#b45309' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <h3 className={styles.confirmTitle}>Reset Product Catalog?</h3>
              <p className={styles.confirmDesc}>
                This will overwrite the current product catalog and restore the original 13 seed clothing items.
              </p>
            </div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.utilityBtn}
                onClick={() => setIsResetConfirmOpen(false)}
                disabled={isResetting}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.primaryAddBtn}
                onClick={handleConfirmReset}
                disabled={isResetting}
              >
                {isResetting ? 'Resetting...' : 'Reset to Default Catalog'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JSON Import/Export Modal */}
      {isJsonModalOpen && (
        <div className={styles.confirmBackdrop} onClick={() => setIsJsonModalOpen(false)}>
          <div
            className={styles.confirmBox}
            style={{ maxWidth: '700px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className={styles.confirmTitle}>JSON Backup & Bulk Import</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                onClick={() => setIsJsonModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <p className={styles.confirmDesc}>
              Export all products as JSON or paste a valid JSON array of products to bulk update.
            </p>

            <textarea
              rows={12}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              style={{
                width: '100%',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                padding: '0.75rem',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                background: '#f8fafc',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className={styles.utilityBtn} onClick={handleExportFile}>
                  💾 Download .json File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={handleFileUploadJson}
                />
                <button type="button" className={styles.utilityBtn} onClick={() => fileInputRef.current?.click()}>
                  📂 Load .json File
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className={styles.utilityBtn} onClick={() => setIsJsonModalOpen(false)}>
                  Cancel
                </button>
                <button type="button" className={styles.primaryAddBtn} onClick={handleImportJson}>
                  Import / Save JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Firebase Setup & Cloud Database Modal */}
      {isFirebaseModalOpen && (
        <div className={styles.confirmBackdrop} onClick={() => setIsFirebaseModalOpen(false)}>
          <div
            className={styles.confirmBox}
            style={{ maxWidth: '620px', width: '92%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🔥</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                    Firebase Firestore & Storage Integration
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Production-ready cloud persistence for Vercel, Netlify, and Cloud hosting
                  </p>
                </div>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsFirebaseModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#94a3b8' }}
              >
                ✕
              </button>
            </div>

            {/* Connection Status Card */}
            <div
              style={{
                background: firebaseStatus.configured ? '#f0fdf4' : '#fffbeb',
                border: `1px solid ${firebaseStatus.configured ? '#bbf7d0' : '#fde68a'}`,
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: firebaseStatus.configured ? '#16a34a' : '#f59e0b',
                    }}
                  />
                  <strong style={{ fontSize: '0.95rem', color: firebaseStatus.configured ? '#15803d' : '#92400e' }}>
                    {firebaseStatus.configured ? 'Firestore Connected & Active' : 'Firebase Not Yet Configured'}
                  </strong>
                </div>
                {firebaseStatus.configured && (
                  <span style={{ fontSize: '0.78rem', background: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 600 }}>
                    Project: {firebaseStatus.projectId}
                  </span>
                )}
              </div>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.82rem', color: firebaseStatus.configured ? '#166534' : '#78350f', lineHeight: 1.5 }}>
                {firebaseStatus.configured
                  ? 'All changes made in this Admin Panel are instantly saved to Google Cloud Firestore and uploaded images go directly to Firebase Storage CDN.'
                  : 'Currently operating in Local Storage Mode (products.json). When deploying to Vercel or Netlify, add your Firebase keys to enable permanent cloud persistence.'}
              </p>
            </div>

            {/* How to Connect */}
            <div style={{ marginBottom: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                Quick 3-Step Setup Instructions:
              </h4>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#64748b', lineHeight: 1.7 }}>
                <li>
                  Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>Firebase Console</a> and create a new project.
                </li>
                <li>
                  Click <strong>Build → Firestore Database</strong> (Create Database in Test Mode or Production Mode) and <strong>Storage</strong>.
                </li>
                <li>
                  Go to <strong>Project Settings (Gear icon) → General → Your Apps → Web App (<code>&lt;/&gt;</code>)</strong>, copy the config keys, and paste them into your <code>.env.local</code> file (or Vercel Environment Variables).
                </li>
              </ol>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
              <button
                type="button"
                className={styles.utilityBtn}
                onClick={checkFirebaseStatus}
                title="Refresh connection status"
              >
                🔄 Refresh Status
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className={styles.primaryAddBtn}
                  onClick={handleSyncToFirestore}
                  disabled={isSyncingFirebase}
                  style={{ background: '#0284c7', borderColor: '#0284c7' }}
                >
                  {isSyncingFirebase ? 'Syncing...' : '⚡ Push Catalog to Firestore'}
                </button>
                <button
                  type="button"
                  className={styles.utilityBtn}
                  onClick={() => setIsFirebaseModalOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className={styles.toastContainer}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`${styles.toast} ${
              toast.type === 'success' ? styles.toastSuccess : styles.toastError
            }`}
          >
            {toast.type === 'success' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
