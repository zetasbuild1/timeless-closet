import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  Firestore
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';
import { Product, products as initialSeedProducts } from '@/data/products';

const PRODUCTS_COLLECTION = 'products';

/**
 * Fetch all products from Firestore.
 * If collection is empty and seedIfEmpty=true, auto-seeds with initial catalog.
 */
export async function getProductsFromFirestore(seedIfEmpty = true): Promise<Product[]> {
  const firestore = db;
  if (!firestore) return [];

  try {
    const productsRef = collection(firestore, PRODUCTS_COLLECTION);
    const q = query(productsRef);
    const snapshot = await getDocs(q);

    if (snapshot.empty && seedIfEmpty) {
      console.log('Firestore products collection is empty. Auto-seeding initial products catalog...');
      await seedAllProductsToFirestore(initialSeedProducts);
      return initialSeedProducts;
    }

    const items: Product[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Product;
      items.push({
        ...data,
        id: docSnap.id,
      });
    });

    // Sort latest first
    items.sort((a, b) => Number(b.id) - Number(a.id));
    return items;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    throw error;
  }
}

/**
 * Fetch a single product by ID from Firestore
 */
export async function getProductByIdFromFirestore(id: string): Promise<Product | null> {
  const firestore = db;
  if (!firestore) return null;

  try {
    const docRef = doc(firestore, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      ...(docSnap.data() as Product),
      id: docSnap.id,
    };
  } catch (error) {
    console.error(`Error fetching product ${id} from Firestore:`, error);
    return null;
  }
}

/**
 * Add or overwrite a product in Firestore
 */
export async function saveProductToFirestore(product: Product): Promise<Product> {
  const firestore = db;
  if (!firestore) throw new Error('Firestore is not initialized');

  const id = product.id && product.id.trim() !== '' ? product.id : String(Date.now());
  const productWithId: Product = {
    ...product,
    id,
  };

  const docRef = doc(firestore, PRODUCTS_COLLECTION, id);
  // Clean undefined properties before saving to Firestore
  const cleanData = JSON.parse(JSON.stringify(productWithId));
  await setDoc(docRef, cleanData);

  return productWithId;
}

/**
 * Update specific fields of a product in Firestore
 */
export async function updateProductInFirestore(id: string, updates: Partial<Product>): Promise<Product | null> {
  const firestore = db;
  if (!firestore) throw new Error('Firestore is not initialized');

  const docRef = doc(firestore, PRODUCTS_COLLECTION, id);
  const existing = await getProductByIdFromFirestore(id);
  if (!existing) {
    return null;
  }

  const updatedProduct: Product = {
    ...existing,
    ...updates,
    id,
  };

  const cleanData = JSON.parse(JSON.stringify(updatedProduct));
  await setDoc(docRef, cleanData, { merge: true });

  return updatedProduct;
}

/**
 * Delete a product from Firestore
 */
export async function deleteProductFromFirestore(id: string): Promise<boolean> {
  const firestore = db;
  if (!firestore) throw new Error('Firestore is not initialized');

  try {
    const docRef = doc(firestore, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id} from Firestore:`, error);
    return false;
  }
}

/**
 * Batch seed all products into Firestore
 */
export async function seedAllProductsToFirestore(productsList: Product[]): Promise<boolean> {
  const firestore = db;
  if (!firestore) throw new Error('Firestore is not initialized');

  try {
    const batch = writeBatch(firestore);
    productsList.forEach((prod) => {
      const docRef = doc(firestore, PRODUCTS_COLLECTION, prod.id);
      const cleanData = JSON.parse(JSON.stringify(prod));
      batch.set(docRef, cleanData);
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error seeding products to Firestore:', error);
    return false;
  }
}

/**
 * Upload an image buffer or Uint8Array directly to Firebase Cloud Storage
 */
export async function uploadImageToFirebaseStorage(
  bytes: Uint8Array | ArrayBuffer,
  mimeType: string,
  fileName: string
): Promise<string> {
  const storageInst = storage;
  if (!storageInst) throw new Error('Firebase Storage is not initialized');

  try {
    const storageRef = ref(storageInst, `products/${Date.now()}-${fileName}`);
    const metadata = { contentType: mimeType };
    const snapshot = await uploadBytes(storageRef, bytes, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    throw error;
  }
}
