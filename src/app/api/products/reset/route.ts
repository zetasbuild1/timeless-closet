import { NextResponse } from 'next/server';
import { resetProducts } from '@/lib/productsStorage';

export async function POST() {
  try {
    const products = await resetProducts();
    return NextResponse.json({
      success: true,
      message: 'Products reset to default catalog successfully.',
      products,
    });
  } catch (error) {
    console.error('Error resetting products:', error);
    return NextResponse.json({ error: 'Failed to reset products' }, { status: 500 });
  }
}
