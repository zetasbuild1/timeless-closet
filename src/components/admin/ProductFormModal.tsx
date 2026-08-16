"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import styles from './ProductFormModal.module.css';

interface ProductFormModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: any) => Promise<boolean | void>;
  existingCategories?: string[];
}

const PRESET_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2', '4', '6', 'UK8', 'UK10', 'UK12', 'Free Size'];
const PRESET_COLORS = [
  '#000000', '#ffffff', '#89ac8c', '#b71c1c', '#1e3a8a', 
  '#800080', '#388e3c', '#c3b091', '#ffc0cb', '#000080', '#546e7a', '#f59e0b'
];
const DEFAULT_CATEGORIES = ['Shirts', 'Tops', 'Dresses', 'T-Shirts', 'Pants', 'Jackets', 'Accessories'];

export default function ProductFormModal({
  product,
  isOpen,
  onClose,
  onSave,
  existingCategories = [],
}: ProductFormModalProps) {
  const isEdit = !!product;

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('Shirts');
  const [customCategory, setCustomCategory] = useState('');
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [gender, setGender] = useState<'Women' | 'Men' | 'Unisex'>('Women');
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [inStock, setInStock] = useState(true);
  
  const [image, setImage] = useState('');
  const [hoverImage, setHoverImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  
  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'L']);
  const [customSizeInput, setCustomSizeInput] = useState('');
  
  const [colors, setColors] = useState<string[]>(['#000000']);
  const [customColor, setCustomColor] = useState('#b71c1c');
  
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState<string[]>([
    'WhatsApp to order: +94 76 867 8104',
    'Cash on Delivery | Bank Deposits'
  ]);
  const [newDetailInput, setNewDetailInput] = useState('');

  const [rating, setRating] = useState<number>(5.0);
  const [reviews, setReviews] = useState<number>(0);
  const [customerReviews, setCustomerReviews] = useState<any[]>([]);

  // Add review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewDate, setNewReviewDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewVerified, setNewReviewVerified] = useState(true);

  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<'main' | 'hover' | 'gallery' | null>(null);

  // Media Library Picker state
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'main' | 'hover' | 'gallery'>('main');
  const [libraryImages, setLibraryImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const hoverFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const mergedCategories = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...existingCategories])
  ).filter(Boolean);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setOriginalPrice(product.originalPrice || '');
      setCategory(product.category || 'Shirts');
      setGender(product.gender || 'Women');
      setIsNew(product.isNew ?? false);
      setIsBestSeller(product.isBestSeller ?? false);
      setInStock(product.inStock !== false);
      setImage(product.image || '');
      setHoverImage(product.hoverImage || '');
      setImages(product.images || (product.image ? [product.image] : []));
      setSizes(product.sizes || ['S', 'M', 'L']);
      setColors(product.colors || ['#000000']);
      setDescription(product.description || '');
      setRating(product.rating ?? 5.0);
      setReviews(product.reviews ?? (product.customerReviews?.length || 0));
      setCustomerReviews(product.customerReviews || []);
      setDetails(product.details && product.details.length > 0 ? product.details : [
        'WhatsApp to order: +94 76 867 8104',
        'Cash on Delivery | Bank Deposits'
      ]);
    } else {
      // Reset form
      setName('');
      setPrice('');
      setOriginalPrice('');
      setCategory('Shirts');
      setGender('Women');
      setIsNew(true);
      setIsBestSeller(false);
      setInStock(true);
      setImage('/images/products/evergreen-shirt1.webp');
      setHoverImage('/images/products/evergreen-shirt2.webp');
      setImages(['/images/products/evergreen-shirt1.webp', '/images/products/evergreen-shirt2.webp']);
      setSizes(['S', 'M', 'L']);
      setColors(['#000000']);
      setDescription('Timeless. Effortless. Always in style. Perfect for everyday looks.');
      setRating(5.0);
      setReviews(12);
      setCustomerReviews([
        {
          id: 'rev-1',
          author: 'Sarah M.',
          rating: 5,
          date: new Date().toISOString().slice(0, 10),
          comment: 'Absolutely love the fabric and fit! Highly recommend.',
          verified: true,
        }
      ]);
      setDetails([
        'WhatsApp to order: +94 76 867 8104',
        'Cash on Delivery | Bank Deposits'
      ]);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'hover' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingField(target);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      const uploadedUrl = data.url;

      if (target === 'main') {
        setImage(uploadedUrl);
        if (!images.includes(uploadedUrl)) {
          setImages(prev => [uploadedUrl, ...prev]);
        }
      } else if (target === 'hover') {
        setHoverImage(uploadedUrl);
        if (!images.includes(uploadedUrl)) {
          setImages(prev => [...prev, uploadedUrl]);
        }
      } else if (target === 'gallery') {
        setImages(prev => [...prev, uploadedUrl]);
      }
    } catch (err) {
      console.error('File upload failed:', err);
      alert('Failed to upload image. Please try again or use a URL.');
    } finally {
      setUploadingField(null);
      if (e.target) e.target.value = '';
    }
  };

  // Open Media Library
  const openMediaPicker = async (target: 'main' | 'hover' | 'gallery') => {
    setMediaTarget(target);
    setMediaPickerOpen(true);
    if (libraryImages.length === 0) {
      try {
        setLoadingImages(true);
        const res = await fetch('/api/images');
        const data = await res.json();
        setLibraryImages(data.images || []);
      } catch (err) {
        console.error('Error fetching images:', err);
      } finally {
        setLoadingImages(false);
      }
    }
  };

  const selectMediaImage = (selectedImgUrl: string) => {
    if (mediaTarget === 'main') {
      setImage(selectedImgUrl);
      if (!images.includes(selectedImgUrl)) {
        setImages(prev => [selectedImgUrl, ...prev]);
      }
    } else if (mediaTarget === 'hover') {
      setHoverImage(selectedImgUrl);
      if (!images.includes(selectedImgUrl)) {
        setImages(prev => [...prev, selectedImgUrl]);
      }
    } else if (mediaTarget === 'gallery') {
      if (!images.includes(selectedImgUrl)) {
        setImages(prev => [...prev, selectedImgUrl]);
      }
    }
    setMediaPickerOpen(false);
  };

  // Size management
  const toggleSize = (size: string) => {
    if (sizes.includes(size)) {
      if (sizes.length > 1) {
        setSizes(sizes.filter(s => s !== size));
      }
    } else {
      setSizes([...sizes, size]);
    }
  };

  const addCustomSize = () => {
    if (customSizeInput.trim() && !sizes.includes(customSizeInput.trim())) {
      setSizes([...sizes, customSizeInput.trim()]);
      setCustomSizeInput('');
    }
  };

  // Color management
  const toggleColor = (colorHex: string) => {
    if (colors.includes(colorHex)) {
      if (colors.length > 1) {
        setColors(colors.filter(c => c !== colorHex));
      }
    } else {
      setColors([...colors, colorHex]);
    }
  };

  const addCustomColor = () => {
    if (customColor && !colors.includes(customColor)) {
      setColors([...colors, customColor]);
    }
  };

  // Details bullet point management
  const addDetailPoint = () => {
    if (newDetailInput.trim()) {
      setDetails([...details, newDetailInput.trim()]);
      setNewDetailInput('');
    }
  };

  const removeDetailPoint = (idx: number) => {
    setDetails(details.filter((_, i) => i !== idx));
  };

  // Gallery image management
  const removeGalleryImage = (imgUrl: string) => {
    setImages(images.filter(img => img !== imgUrl));
  };

  // Reviews management
  const handleAddReview = () => {
    if (!newReviewAuthor.trim()) {
      alert('Please enter a customer reviewer name');
      return;
    }
    if (!newReviewComment.trim()) {
      alert('Please enter review comment');
      return;
    }
    const newRev = {
      id: 'rev-' + Date.now(),
      author: newReviewAuthor.trim(),
      rating: Number(newReviewRating),
      date: newReviewDate || new Date().toISOString().slice(0, 10),
      comment: newReviewComment.trim(),
      verified: newReviewVerified,
    };
    const updated = [newRev, ...customerReviews];
    setCustomerReviews(updated);
    setNewReviewAuthor('');
    setNewReviewComment('');
    // Auto-calculate average rating and count
    const avg = updated.reduce((sum, r) => sum + r.rating, 0) / updated.length;
    setRating(Math.round(avg * 10) / 10);
    setReviews(updated.length);
  };

  const handleRemoveReview = (reviewId: string) => {
    const updated = customerReviews.filter(r => r.id !== reviewId);
    setCustomerReviews(updated);
    if (updated.length > 0) {
      const avg = updated.reduce((sum, r) => sum + r.rating, 0) / updated.length;
      setRating(Math.round(avg * 10) / 10);
      setReviews(updated.length);
    }
  };

  const handleSyncRating = () => {
    if (customerReviews.length > 0) {
      const avg = customerReviews.reduce((sum, r) => sum + r.rating, 0) / customerReviews.length;
      setRating(Math.round(avg * 10) / 10);
      setReviews(customerReviews.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a product title');
      return;
    }
    if (!price || Number(price) <= 0) {
      alert('Please enter a valid price');
      return;
    }
    if (!image.trim()) {
      alert('Please provide at least a primary image');
      return;
    }

    const finalCategory = isAddingNewCategory && customCategory.trim() 
      ? customCategory.trim() 
      : category;

    const payload: Partial<Product> = {
      name: name.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category: finalCategory,
      gender,
      isNew,
      isBestSeller,
      inStock,
      image: image.trim(),
      hoverImage: hoverImage.trim() || undefined,
      images: images.length > 0 ? images : [image.trim()],
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L'],
      colors: colors.length > 0 ? colors : ['#000000'],
      description: description.trim() || 'Timeless piece.',
      rating: Number(rating) || 5.0,
      reviews: Number(reviews) || customerReviews.length,
      customerReviews: customerReviews.length > 0 ? customerReviews : undefined,
      details: details.length > 0 ? details : ['WhatsApp to order: +94 76 867 8104'],
    };

    if (product?.id) {
      payload.id = product.id;
    }

    try {
      setSaving(true);
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setSaving(false);
    }
  };

  // Preview dummy object
  const previewProduct: Product = {
    id: product?.id || 'preview-id',
    name: name || 'Product Name Preview',
    price: Number(price) || 3500,
    originalPrice: originalPrice ? Number(originalPrice) : undefined,
    category: isAddingNewCategory ? customCategory || 'Category' : category,
    gender,
    isNew,
    isBestSeller,
    inStock,
    image: image || '/images/products/evergreen-shirt1.webp',
    hoverImage: hoverImage || image || '/images/products/evergreen-shirt2.webp',
    sizes,
    colors,
    rating: Number(rating) || 5.0,
    reviews: Number(reviews) || customerReviews.length,
    customerReviews,
    description,
    details,
  };

  return (
    <div className={styles.backdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleWrapper}>
            <div>
              <h2 className={styles.modalTitle}>
                {isEdit ? `Edit Product: ${product?.name}` : 'Add New Product'}
              </h2>
              <p className={styles.modalSubtitle}>
                {isEdit ? `ID: ${product?.id} — Update pricing, media, flags, and variants` : 'Fill in the information below to add a new item to the store catalog'}
              </p>
            </div>
            {isEdit && <span className={styles.badge}>Editing SKU #{product?.id}</span>}
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form id="product-form" onSubmit={handleSubmit} className={styles.modalBody}>
          <div className={styles.formSection}>
            {/* Section 1: General Info */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                General Information
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.label}>
                  Product Title <span className={styles.labelRequired}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vintage Linen Oversized Shirt"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className={styles.label}>
                      Category <span className={styles.labelRequired}>*</span>
                    </label>
                    <button
                      type="button"
                      style={{ fontSize: '0.75rem', color: '#b71c1c', fontWeight: 500 }}
                      onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                    >
                      {isAddingNewCategory ? '← Choose Existing' : '+ New Category'}
                    </button>
                  </div>
                  {isAddingNewCategory ? (
                    <input
                      type="text"
                      placeholder="Type custom category name..."
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={styles.select}
                    >
                      {mergedCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Gender / Department</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className={styles.select}
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Pricing & Badges */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Pricing & Promotion Flags
              </div>

              <div className={styles.grid2} style={{ marginBottom: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Price (LKR) <span className={styles.labelRequired}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="50"
                    placeholder="3500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Original Price (LKR)
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '4px' }}>
                      (Strike-through price if discounted)
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    placeholder="e.g. 4500"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.grid2}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleLabel}>
                    <span className={styles.toggleTitle}>New Arrival</span>
                    <span className={styles.toggleDesc}>Show 'NEW' badge in catalog</span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={(e) => setIsNew(e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleLabel}>
                    <span className={styles.toggleTitle}>Best Seller</span>
                    <span className={styles.toggleDesc}>Highlight on Home & Best Sellers</span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={isBestSeller}
                      onChange={(e) => setIsBestSeller(e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleRow} style={{ gridColumn: 'span 2' }}>
                  <div className={styles.toggleLabel}>
                    <span className={styles.toggleTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {inStock ? (
                        <span style={{ color: '#16a34a', fontWeight: 600 }}>In Stock (Available for Purchase)</span>
                      ) : (
                        <span style={{ color: '#dc2626', fontWeight: 600 }}>Out of Stock (Sold Out)</span>
                      )}
                    </span>
                    <span className={styles.toggleDesc}>
                      {inStock ? 'Shoppers can add this item to cart and purchase it.' : 'Item will display a "SOLD OUT" badge and purchase buttons will be disabled.'}
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                    />
                    <span className={styles.slider} style={{ backgroundColor: inStock ? '#16a34a' : '#cbd5e1' }}></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 3: Media & Images */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Product Imagery
              </div>

              {/* Main Image */}
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.label}>
                  Main Display Image <span className={styles.labelRequired}>*</span>
                </label>
                <div className={styles.imageUploadGroup}>
                  <input
                    type="text"
                    required
                    placeholder="/images/products/... or https://..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={styles.input}
                  />
                  {image && (
                    <img src={image} alt="Preview" className={styles.imagePreviewThumb} />
                  )}
                  <input
                    ref={mainFileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'main')}
                  />
                  <button
                    type="button"
                    className={styles.uploadBtn}
                    onClick={() => mainFileInputRef.current?.click()}
                    disabled={uploadingField === 'main'}
                  >
                    {uploadingField === 'main' ? 'Uploading...' : '📁 Upload'}
                  </button>
                  <button
                    type="button"
                    className={styles.libraryBtn}
                    onClick={() => openMediaPicker('main')}
                  >
                    Catalog Assets
                  </button>
                </div>
              </div>

              {/* Hover Image */}
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.label}>Hover Flip Image (Optional)</label>
                <div className={styles.imageUploadGroup}>
                  <input
                    type="text"
                    placeholder="/images/products/... (swaps on cursor hover)"
                    value={hoverImage}
                    onChange={(e) => setHoverImage(e.target.value)}
                    className={styles.input}
                  />
                  {hoverImage && (
                    <img src={hoverImage} alt="Hover preview" className={styles.imagePreviewThumb} />
                  )}
                  <input
                    ref={hoverFileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'hover')}
                  />
                  <button
                    type="button"
                    className={styles.uploadBtn}
                    onClick={() => hoverFileInputRef.current?.click()}
                    disabled={uploadingField === 'hover'}
                  >
                    {uploadingField === 'hover' ? 'Uploading...' : '📁 Upload'}
                  </button>
                  <button
                    type="button"
                    className={styles.libraryBtn}
                    onClick={() => openMediaPicker('hover')}
                  >
                    Catalog Assets
                  </button>
                </div>
              </div>

              {/* Gallery Images */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Gallery Photos ({images.length} added)</label>
                <div className={styles.galleryList}>
                  {images.map((imgUrl, i) => (
                    <div key={i} className={styles.galleryItem}>
                      <img src={imgUrl} alt={`Gallery ${i}`} className={styles.imagePreviewThumb} />
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...images];
                          updated[i] = e.target.value;
                          setImages(updated);
                        }}
                        className={styles.input}
                      />
                      <button
                        type="button"
                        className={styles.removeImgBtn}
                        onClick={() => removeGalleryImage(imgUrl)}
                        title="Remove photo"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'gallery')}
                  />
                  <button
                    type="button"
                    className={styles.addGalleryBtn}
                    onClick={() => galleryFileInputRef.current?.click()}
                    disabled={uploadingField === 'gallery'}
                  >
                    + Upload Gallery Image
                  </button>
                  <button
                    type="button"
                    className={styles.addGalleryBtn}
                    onClick={() => openMediaPicker('gallery')}
                  >
                    + Pick From Catalog Assets
                  </button>
                </div>
              </div>
            </div>

            {/* Section 4: Sizes & Colors */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
                Sizes & Color Variants
              </div>

              {/* Sizes */}
              <div className={styles.formGroup} style={{ marginBottom: '1.25rem' }}>
                <label className={styles.label}>Available Sizes (Click to toggle)</label>
                <div className={styles.chipsWrapper}>
                  {PRESET_SIZES.map((size) => {
                    const isSelected = sizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        className={`${styles.chip} ${isSelected ? styles.chipActive : ''}`}
                        onClick={() => toggleSize(size)}
                      >
                        {size} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.customAddWrapper}>
                  <input
                    type="text"
                    placeholder="Custom size..."
                    value={customSizeInput}
                    onChange={(e) => setCustomSizeInput(e.target.value)}
                    className={styles.customInput}
                  />
                  <button type="button" className={styles.addChipBtn} onClick={addCustomSize}>
                    + Add
                  </button>
                </div>
              </div>

              {/* Colors */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Color Swatches</label>
                <div className={styles.colorSwatches}>
                  {PRESET_COLORS.map((colorHex) => {
                    const isSelected = colors.includes(colorHex);
                    return (
                      <div
                        key={colorHex}
                        className={`${styles.colorSwatch} ${isSelected ? styles.colorSwatchSelected : ''}`}
                        style={{ backgroundColor: colorHex }}
                        onClick={() => toggleColor(colorHex)}
                        title={colorHex}
                      />
                    );
                  })}
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className={styles.nativeColorPicker}
                    title="Custom color picker"
                  />
                  <button type="button" className={styles.addChipBtn} onClick={addCustomColor}>
                    + Add Color
                  </button>
                </div>
              </div>
            </div>

            {/* Section 5: Description & Details */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                Description & Bullet Specifications
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.label}>Product Description</label>
                <textarea
                  placeholder="Short, attractive story and product description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bullet Highlights & Features</label>
                <div className={styles.detailsList}>
                  {details.map((detail, idx) => (
                    <div key={idx} className={styles.detailRow}>
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => {
                          const updated = [...details];
                          updated[idx] = e.target.value;
                          setDetails(updated);
                        }}
                        className={styles.input}
                      />
                      <button
                        type="button"
                        className={styles.removeImgBtn}
                        onClick={() => removeDetailPoint(idx)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Add bullet (e.g. 100% Breathable Cotton)..."
                    value={newDetailInput}
                    onChange={(e) => setNewDetailInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addDetailPoint(); } }}
                    className={styles.input}
                  />
                  <button type="button" className={styles.addChipBtn} onClick={addDetailPoint}>
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Section 6: Ratings & Customer Reviews */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Ratings & Customer Reviews ({customerReviews.length} reviews)
              </div>

              <div className={styles.grid2} style={{ marginBottom: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Store Display Rating (1.0 - 5.0)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      placeholder="4.8"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className={styles.input}
                    />
                    <div style={{ display: 'flex', color: '#f59e0b', fontSize: '1.1rem', letterSpacing: '2px' }}>
                      {'★'.repeat(Math.min(5, Math.max(1, Math.round(rating))))}
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className={styles.label}>Total Reviews Count Display</label>
                    {customerReviews.length > 0 && (
                      <button
                        type="button"
                        className={styles.syncRatingBtn}
                        onClick={handleSyncRating}
                        title="Calculate average from reviews list below"
                      >
                        ⚡ Sync from list
                      </button>
                    )}
                  </div>
                  <input
                    type="number"
                    min="0"
                    placeholder="16"
                    value={reviews}
                    onChange={(e) => setReviews(Number(e.target.value))}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Customer Reviews List */}
              <div className={styles.reviewsContainer}>
                <label className={styles.label}>Customer Reviews Feed</label>
                
                {customerReviews.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    No specific customer reviews added yet. You can add one below.
                  </p>
                ) : (
                  customerReviews.map((rev) => (
                    <div key={rev.id} className={styles.reviewItemCard}>
                      <div className={styles.reviewItemTop}>
                        <div className={styles.reviewAuthorGroup}>
                          <span className={styles.reviewAuthorName}>{rev.author}</span>
                          {rev.verified && (
                            <span className={styles.verifiedBadge}>✓ Verified Buyer</span>
                          )}
                          <span className={styles.reviewDateText}>{rev.date}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div className={styles.reviewStarsRow}>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <svg key={s} width="14" height="14" fill={s <= rev.rating ? "#f59e0b" : "#e2e8f0"} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                          <button
                            type="button"
                            className={styles.removeImgBtn}
                            onClick={() => handleRemoveReview(rev.id)}
                            title="Delete review"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <p className={styles.reviewCommentText}>"{rev.comment}"</p>
                    </div>
                  ))
                )}

                {/* Add Review Sub-Form */}
                <div className={styles.addReviewBox}>
                  <div className={styles.addReviewTitle}>
                    <span>+ Add Customer Review</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'normal' }}>
                      Add authentic customer feedback
                    </span>
                  </div>

                  <div className={styles.grid3}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Customer Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Kasun P."
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Star Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className={styles.select}
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                        <option value={3}>⭐⭐⭐ (3 Stars)</option>
                        <option value={2}>⭐⭐ (2 Stars)</option>
                        <option value={1}>⭐ (1 Star)</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Review Date</label>
                      <input
                        type="date"
                        value={newReviewDate}
                        onChange={(e) => setNewReviewDate(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Review Feedback / Testimonial</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Excellent material and fast delivery. Looks very stylish!"
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className={styles.textarea}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className={styles.checkboxLabel} style={{ fontSize: '0.82rem' }}>
                      <input
                        type="checkbox"
                        checked={newReviewVerified}
                        onChange={(e) => setNewReviewVerified(e.target.checked)}
                      />
                      <span>Mark as Verified Purchase</span>
                    </label>

                    <button
                      type="button"
                      className={styles.primaryAddBtn}
                      style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                      onClick={handleAddReview}
                    >
                      + Add Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Product Card Preview */}
          <div className={styles.previewPanel}>
            <div className={styles.previewHeader}>
              <span className={styles.previewTitle}>Live Shop Preview</span>
              <span className={styles.previewBadge}>Realtime</span>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Preview how this product card will appear to shoppers on the store:
            </p>

            <div className={styles.cardPreviewBox}>
              <ProductCard product={previewProduct} />
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748b', background: '#f1f5f9', padding: '0.75rem', borderRadius: '6px' }}>
              <div><strong>Category:</strong> {previewProduct.category}</div>
              <div><strong>Gender:</strong> {previewProduct.gender}</div>
              <div><strong>Sizes:</strong> {previewProduct.sizes?.join(', ')}</div>
              <div><strong>Gallery photos:</strong> {previewProduct.images?.length || 1}</div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            className={styles.submitBtn}
            disabled={saving}
          >
            {saving ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10"/>
                </svg>
                Saving Product...
              </>
            ) : (
              isEdit ? '✓ Save Changes' : '+ Create Product'
            )}
          </button>
        </div>
      </div>

      {/* Catalog Asset Picker Modal */}
      {mediaPickerOpen && (
        <div className={styles.mediaPickerBackdrop} onClick={() => setMediaPickerOpen(false)}>
          <div className={styles.mediaPickerBox} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Choose from Catalog Images</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                onClick={() => setMediaPickerOpen(false)}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              Click on any existing catalog product photo to select it:
            </p>

            {loadingImages ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                Loading asset library...
              </div>
            ) : (
              <div className={styles.mediaGrid}>
                {libraryImages.map((imgUrl, i) => (
                  <div
                    key={i}
                    className={styles.mediaItem}
                    onClick={() => selectMediaImage(imgUrl)}
                    title={imgUrl}
                  >
                    <img src={imgUrl} alt={`Asset ${i}`} loading="lazy" />
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              className={styles.cancelBtn}
              style={{ alignSelf: 'flex-end' }}
              onClick={() => setMediaPickerOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
