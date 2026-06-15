import { NextResponse } from 'next/server';
import { adminDb, isConfigured } from '@/lib/firebase-admin';
import { randomBytes } from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, date, time, guestsCount, seatingType, notes } = body;

    if (!name || !phone || !date || !time || !guestsCount || !seatingType) {
      return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 });
    }

    if (!/^(01)[0-9]{9}$/.test(phone.trim())) {
      return NextResponse.json({ error: 'رقم الهاتف غير صحيح' }, { status: 400 });
    }

    const trackingToken = randomBytes(8).toString('hex').toUpperCase();

    if (!isConfigured) {
      return NextResponse.json({
        success: true,
        reservationId: 'local-' + Date.now(),
        trackingToken,
        local: true,
      });
    }

    const reservationData = {
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guestsCount: Number(guestsCount),
      seatingType,
      notes: notes?.trim() || '',
      status: 'pending',
      trackingToken,
      createdAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection('reservations').add(reservationData);

    return NextResponse.json({
      success: true,
      reservationId: docRef.id,
      trackingToken,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      reservationId: 'local-' + Date.now(),
      trackingToken: randomBytes(8).toString('hex').toUpperCase(),
      local: true,
    });
  }
}
