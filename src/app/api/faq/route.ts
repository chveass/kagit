import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getFaq, addFaqItem, updateFaqItem, deleteFaqItem } from '@/lib/cms';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const faq = getFaq();
    return NextResponse.json(faq);
  } catch (error) {
    console.error('FAQ GET error:', error);
    return NextResponse.json({ error: 'SSS alınamadı' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const body = await request.json();
    const item = {
      id: uuidv4(),
      ...body
    };

    const created = addFaqItem(item);
    revalidatePath('/', 'layout');
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('FAQ POST error:', error);
    return NextResponse.json({ error: 'SSS eklenemedi' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const body = await request.json();
    const updated = updateFaqItem(body.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'SSS bulunamadı' }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    return NextResponse.json(updated);
  } catch (error) {
    console.error('FAQ PUT error:', error);
    return NextResponse.json({ error: 'SSS güncellenemedi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const { id } = await request.json();
    const deleted = deleteFaqItem(id);

    if (!deleted) {
      return NextResponse.json({ error: 'SSS bulunamadı' }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('FAQ DELETE error:', error);
    return NextResponse.json({ error: 'SSS silinemedi' }, { status: 500 });
  }
}
