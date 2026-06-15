import { NextResponse } from 'next/server';
import { adminDb, isConfigured } from '@/lib/firebase-admin';
import { randomBytes } from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, deliveryAddress, branch, branchName, branchAddress, items, totalPrice } = body;

    if (!customerName || !customerPhone || !deliveryAddress || !items?.length) {
      return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 });
    }

    const trackingToken = randomBytes(8).toString('hex').toUpperCase();

    if (!isConfigured) {
      return NextResponse.json({
        success: true,
        orderId: 'local-' + Date.now(),
        trackingToken,
        local: true,
      });
    }

    const orderData = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      branch: branch || 'cairo',
      branchName: branchName || 'فرع القاهرة',
      branchAddress: branchAddress || '',
      items: items.map(({ itemId, title, quantity, price }) => ({
        itemId,
        title,
        quantity,
        price,
      })),
      totalPrice,
      status: 'pending',
      trackingToken,
      createdAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection('orders').add(orderData);

    return NextResponse.json({
      success: true,
      orderId: docRef.id,
      trackingToken,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      orderId: 'local-' + Date.now(),
      trackingToken: randomBytes(8).toString('hex').toUpperCase(),
      local: true,
    });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token مطلوب' }, { status: 400 });
    }

    if (!isConfigured) {
      return NextResponse.json({
        success: false,
        error: 'قاعدة البيانات غير متصلة حالياً — تتبع الأوردرات متاح بعد تفعيل Firebase',
      });
    }

    const snapshot = await adminDb
      .collection('orders')
      .where('trackingToken', '==', token.toUpperCase())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    return NextResponse.json({
      success: true,
      order: { id: doc.id, ...doc.data() },
    });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ في السيرفر' }, { status: 500 });
  }
}
