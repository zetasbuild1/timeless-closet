import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');
    const files = await fs.readdir(imagesDir);
    
    // Filter for valid image formats
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
    const imageFiles = files
      .filter(file => !file.startsWith('.') && imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
      .map(file => `/images/products/${file}`);

    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    console.error('Error listing product images:', error);
    return NextResponse.json({ images: [] });
  }
}
