import fs from 'fs/promises';
import path from 'path';
import { Product, products as initialSeedProducts } from '@/data/products';
import { isFirebaseConfigured } from './firebase';
import {
  getProductsFromFirestore,
  getProductByIdFromFirestore,
  saveProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  seedAllProductsToFirestore
} from './firestoreService';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

/**
 * Read products from local JSON file
 */
async function getLocalProducts(): Promise<Product[]> {
  try {
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const parsed = JSON.parse(fileData);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return initialSeedProducts;
  } catch (error) {
    console.warn('Could not read products.json, falling back to seed products:', error);
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(initialSeedProducts, null, 2), 'utf-8');
    } catch (writeErr) {
      console.error('Error writing fallback products.json:', writeErr);
    }
    return initialSeedProducts;
  }
}

/**
 * Save products to local JSON file
 */
async function saveLocalProducts(products: Product[]): Promise<boolean> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (error: any) {
    console.error('Failed to save products to products.json:', error);
    if (error.code === 'EROFS') {
      throw new Error('Read-only filesystem detected. Please configure Firebase for live deployments.');
    }
    return false;
  }
}

// -------------------------------------------------------------
// PUBLIC STORAGE API (Transparently routes to Firestore or Local)
// -------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  if (isFirebaseConfigured()) {
    try {
      return await getProductsFromFirestore(true);
    } catch (err) {
      console.error('Firestore getProducts failed, falling back to local:', err);
      return await getLocalProducts();
    }
  }
  return await getLocalProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isFirebaseConfigured()) {
    try {
      return await getProductByIdFromFirestore(id);
    } catch (err) {
      console.error(`Firestore getProductById(${id}) failed, falling back to local:`, err);
    }
  }
  const products = await getLocalProducts();
  return products.find(p => p.id === id) || null;
}

export async function saveProducts(products: Product[]): Promise<boolean> {
  if (isFirebaseConfigured()) {
    try {
      return await seedAllProductsToFirestore(products);
    } catch (err) {
      console.error('Firestore saveProducts failed:', err);
    }
  }
  return await saveLocalProducts(products);
}

export async function addProduct(product: Omit<Product, 'id'> & { id?: string }): Promise<Product> {
  const id = product.id && product.id.trim() !== '' 
    ? product.id 
    : String(Date.now());
  
  const newProduct: Product = {
    ...product,
    id,
    rating: product.rating ?? 5.0,
    reviews: product.reviews ?? 0,
    inStock: product.inStock !== false,
    sizes: product.sizes || ['S', 'M', 'L'],
    colors: product.colors || ['#000000'],
    images: product.images && product.images.length > 0 ? product.images : [product.image],
  };

  if (isFirebaseConfigured()) {
    try {
      const saved = await saveProductToFirestore(newProduct);
      // Also update local copy in background for offline dev caching
      getLocalProducts().then(localProds => {
        saveLocalProducts([saved, ...localProds.filter(p => p.id !== saved.id)]).catch(() => {});
      });
      return saved;
    } catch (err) {
      console.error('Firestore addProduct failed, saving locally:', err);
    }
  }

  const products = await getLocalProducts();
  const updatedProducts = [newProduct, ...products.filter(p => p.id !== id)];
  const saved = await saveLocalProducts(updatedProducts);
  if (!saved) throw new Error('Failed to save product locally');
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  if (isFirebaseConfigured()) {
    try {
      const updated = await updateProductInFirestore(id, updates);
      if (updated) {
        // Also sync local
        getLocalProducts().then(localProds => {
          const idx = localProds.findIndex(p => p.id === id);
          if (idx !== -1) {
            localProds[idx] = updated;
            saveLocalProducts(localProds).catch(() => {});
          }
        });
        return updated;
      }
    } catch (err) {
      console.error(`Firestore updateProduct(${id}) failed, falling back to local:`, err);
    }
  }

  const products = await getLocalProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return null;
  }

  const existing = products[index];
  const updated: Product = {
    ...existing,
    ...updates,
    id: existing.id,
  };

  if (updated.image && (!updated.images || updated.images.length === 0)) {
    updated.images = [updated.image];
  }

  products[index] = updated;
  const saved = await saveLocalProducts(products);
  if (!saved) throw new Error('Failed to update product locally');
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isFirebaseConfigured()) {
    try {
      const success = await deleteProductFromFirestore(id);
      if (!success) {
        throw new Error(`Failed to delete product ${id} from Firestore`);
      }
      // Also delete from local
      getLocalProducts().then(localProds => {
        saveLocalProducts(localProds.filter(p => p.id !== id)).catch(() => {});
      });
      return true;
    } catch (err) {
      console.error(`Firestore deleteProduct(${id}) failed:`, err);
      // Fallback to local if Firestore fails (or we can just fail the API call)
      throw err;
    }
  }

  const products = await getLocalProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) {
    return false;
  }
  const saved = await saveLocalProducts(filtered);
  if (!saved) throw new Error('Failed to delete product locally');
  return true;
}

export async function resetProducts(): Promise<Product[]> {
  if (isFirebaseConfigured()) {
    try {
      await seedAllProductsToFirestore(initialSeedProducts);
    } catch (err) {
      console.error('Firestore resetProducts failed:', err);
    }
  }
  await saveLocalProducts(initialSeedProducts);
  return initialSeedProducts;
}
