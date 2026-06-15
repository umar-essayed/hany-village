import { NextResponse } from 'next/server';
import { adminDb, isConfigured } from '@/lib/firebase-admin';

export async function GET() {
  try {
    if (!isConfigured || !adminDb) {
      return NextResponse.json({ success: false, error: 'Database not configured' });
    }

    const snapshot = await adminDb.collection('menu').orderBy('priority', 'desc').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
