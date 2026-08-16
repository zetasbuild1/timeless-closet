import { NextResponse } from 'next/server';
import { isFirebaseConfigured, firebaseConfig } from '@/lib/firebase';
import { getProductsFromFirestore } from '@/lib/firestoreService';

export async function GET() {
  const configured = isFirebaseConfigured();
  if (!configured) {
    return NextResponse.json({
      configured: false,
      projectId: null,
      message: 'Firebase credentials are not set in .env.local',
    });
  }

  try {
    const products = await getProductsFromFirestore(false);
    return NextResponse.json({
      configured: true,
      connected: true,
      projectId: firebaseConfig.projectId,
      firestoreCount: products.length,
      message: `Connected to Firestore project "${firebaseConfig.projectId}"`,
    });
  } catch (error: any) {
    return NextResponse.json({
      configured: true,
      connected: false,
      projectId: firebaseConfig.projectId,
      error: error.message || 'Failed to communicate with Firestore',
    });
  }
}
