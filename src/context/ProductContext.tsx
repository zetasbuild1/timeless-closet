"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, products as initialProducts } from '@/data/products';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => Promise<Product | null>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  toggleProductStatus: (id: string, field: 'isNew' | 'isBestSeller' | 'inStock') => Promise<void>;
  toggleStockStatus: (id: string) => Promise<void>;
  resetProducts: () => Promise<boolean>;
  refreshProducts: () => Promise<void>;
  importProducts: (productsList: Product[]) => Promise<boolean>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products?t=' + Date.now(), { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to fetch latest products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    // Listen for custom product update events across windows/components
    const handleProductsUpdated = () => {
      fetchProducts();
    };

    window.addEventListener('productsUpdated', handleProductsUpdated);
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated);
    };
  }, [fetchProducts]);

  const notifyProductsUpdated = () => {
    window.dispatchEvent(new Event('productsUpdated'));
  };

  const addProduct = async (productData: Omit<Product, 'id'> & { id?: string }): Promise<Product | null> => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to add product');
      }

      const created: Product = await response.json();
      setProducts(prev => [created, ...prev]);
      notifyProductsUpdated();
      return created;
    } catch (err: any) {
      console.error('Error adding product:', err);
      setError(err.message || 'Failed to add product');
      return null;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to update product');
      }

      const updated: Product = await response.json();
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
      notifyProductsUpdated();
      return updated;
    } catch (err: any) {
      console.error('Error updating product:', err);
      setError(err.message || 'Failed to update product');
      return null;
    }
  };

  const toggleProductStatus = async (id: string, field: 'isNew' | 'isBestSeller' | 'inStock') => {
    const current = products.find(p => p.id === id);
    if (!current) return;
    const currentVal = field === 'inStock' ? (current.inStock !== false) : !!current[field];
    const newVal = !currentVal;
    await updateProduct(id, { [field]: newVal });
  };

  const toggleStockStatus = async (id: string) => {
    await toggleProductStatus(id, 'inStock');
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(prev => prev.filter(p => p.id !== id));
      notifyProductsUpdated();
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      return false;
    }
  };

  const resetProducts = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/products/reset', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to reset');
      const data = await response.json();
      setProducts(data.products || initialProducts);
      notifyProductsUpdated();
      return true;
    } catch (err) {
      console.error('Error resetting products:', err);
      return false;
    }
  };

  const importProducts = async (productsList: Product[]): Promise<boolean> => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productsList),
      });

      if (!response.ok) throw new Error('Failed to import products');
      setProducts(productsList);
      notifyProductsUpdated();
      return true;
    } catch (err) {
      console.error('Error importing products:', err);
      return false;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        toggleStockStatus,
        resetProducts,
        refreshProducts: fetchProducts,
        importProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
