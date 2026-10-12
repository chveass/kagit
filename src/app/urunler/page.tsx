import type { Metadata } from 'next';
import { connection } from 'next/server';
import { getProducts, getCategories } from '@/lib/cms';
import ProductCatalog from '@/components/ProductCatalog';

export const metadata: Metadata = {
  title: 'Ürünlerimiz - Granür Poşet ve Ambalaj Çözümleri',
  description: 'Murat Kağıtçılık toptan granür poşet ve ambalaj ürünlerinin ebat, renk ve sipariş detaylarını inceleyin. İhtiyacınıza uygun poşet üretimi için teklif alın.',
};

export default async function UrunlerPage() {
  await connection();

  const products = getProducts();
  const categories = getCategories();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-kraft-50 to-cream-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-kraft-200/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-block text-sm text-kraft-600 font-semibold uppercase tracking-wider mb-3">
            Ürün Kataloğu
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Ürünlerimiz
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl">
            Geniş ürün yelpazemizden ihtiyacınıza uygun ambalaj çözümünü keşfedin.
            Her ürünümüz kalite standartlarımıza uygun olarak üretilmektedir.
          </p>
        </div>
      </section>

      <ProductCatalog products={products} categories={categories} />
    </>
  );
}
