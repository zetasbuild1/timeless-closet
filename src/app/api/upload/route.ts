import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isFirebaseConfigured } from '@/lib/firebase';
import { uploadImageToFirebaseStorage } from '@/lib/firestoreService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const cleanOriginalName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-');

    // 1. If Firebase Cloud Storage is configured, upload directly to Firebase Storage CDN
    if (isFirebaseConfigured()) {
      try {
        const firebaseUrl = await uploadImageToFirebaseStorage(
          bytes,
          file.type || 'image/jpeg',
          cleanOriginalName
        );
        return NextResponse.json({
          success: true,
          url: firebaseUrl,
          filename: cleanOriginalName,
          provider: 'firebase',
        });
      } catch (fbErr) {
        console.error('Firebase Storage upload failed, falling back to local filesystem:', fbErr);
      }
    }

    // 2. Fallback to local filesystem (/public/images/products/)
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const filename = `${timestamp}-${cleanOriginalName}`;
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products');

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/images/products/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      provider: 'local',
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
