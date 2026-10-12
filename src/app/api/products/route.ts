import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProducts, getFeaturedProducts, getProductsByCategory, addProduct } from '@/lib/cms';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let products;

    if (featured === 'true') {
      products = getFeaturedProducts();
    } else if (category) {
      products = getProductsByCategory(category);
    } else {
      products = getProducts();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Ürünler alınamadı' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const body = await request.json();
    const product = {
      id: uuidv4(),
      ...body,
      slug: body.name
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const created = addProduct(product);
    revalidatePath('/', 'layout');
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Ürün eklenemedi' }, { status: 500 });
  }
}
