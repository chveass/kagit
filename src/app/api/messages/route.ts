import { NextRequest, NextResponse } from 'next/server';
import { getContacts, getQuotes, markContactRead, markQuoteRead } from '@/lib/cms';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'quotes') {
      return NextResponse.json(getQuotes());
    }

    return NextResponse.json(getContacts());
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json({ error: 'Mesajlar alınamadı' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const { id, type } = await request.json();

    if (type === 'quote') {
      markQuoteRead(id);
    } else {
      markContactRead(id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Messages PUT error:', error);
    return NextResponse.json({ error: 'Mesaj güncellenemedi' }, { status: 500 });
  }
}
