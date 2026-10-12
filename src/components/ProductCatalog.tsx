'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Filter, X, MessageCircle, Mail, ChevronRight } from 'lucide-react';
import type { Product, Category } from '@/lib/types';

type ProductCatalogProps = {
  products: Product[];
  categories: Category[];
};

export default function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <Filter size={18} className="text-charcoal-400" />
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-kraft-500 text-white shadow-md'
                  : 'bg-kraft-50 text-charcoal-600 border border-kraft-200 hover:border-kraft-400'
              }`}
            >
              Tüm Ürünler ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter(p => p.category === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-kraft-500 text-white shadow-md'
                      : 'bg-kraft-50 text-charcoal-600 border border-kraft-200 hover:border-kraft-400'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="card overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[3/2] w-full bg-[#f5f0e8] flex items-center justify-center overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      decoding="async"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Package size={64} className="text-kraft-300 group-hover:text-kraft-400 transition-colors" />
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-charcoal-700 shadow-sm z-10 border border-charcoal-100">
                    MOQ: {product.moq.toLocaleString('tr-TR')} KG
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-charcoal-800 mb-2 group-hover:text-kraft-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-charcoal-500 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1.5 mb-3">
                    {product.colors.map((color) => (
                      <div
                        key={color.hex}
                        className="w-6 h-6 rounded-full border-2 border-charcoal-200 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.sizes.map((size) => (
                      <span key={size} className="text-xs bg-kraft-50 text-kraft-700 px-2 py-1 rounded-md border border-kraft-200">
                        {size}
                      </span>
                    ))}
                  </div>

                  <button className="w-full text-center py-2.5 text-sm font-medium text-kraft-600 border border-kraft-300 rounded-xl hover:bg-kraft-50 transition-all flex items-center justify-center gap-1">
                    Detayları Gör
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-charcoal-700 rounded-full shadow-md transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-[3/2] max-h-[400px] w-full bg-[#f5f0e8] flex items-center justify-center rounded-t-2xl overflow-hidden">
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  decoding="async"
                  className="w-full h-full object-contain rounded-t-2xl"
                />
              ) : (
                <Package size={80} className="text-kraft-300" />
              )}
            </div>

            <div className="p-8">
              <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-3">
                {selectedProduct.name}
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                {selectedProduct.description}
              </p>

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wider mb-3">
                  Ebat Seçenekleri
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <span key={size} className="px-4 py-2 bg-kraft-50 text-kraft-700 rounded-lg border border-kraft-200 text-sm font-medium">
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wider mb-3">
                  Renk Kartelası
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.colors.map((color) => (
                    <div key={color.hex} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-charcoal-200 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <span className="text-sm text-charcoal-700">{color.name}</span>
                        <span className="block text-xs text-charcoal-400 uppercase">{color.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MOQ */}
              <div className="mb-8 p-4 bg-kraft-50 rounded-xl border border-kraft-200">
                <span className="text-sm text-charcoal-500">Minimum Sipariş Miktarı (MOQ)</span>
                <div className="font-display text-2xl font-bold text-kraft-600">
                  {selectedProduct.moq.toLocaleString('tr-TR')} KG
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/905416403969?text=${encodeURIComponent(`Merhaba, ${selectedProduct.name} hakkında teklif almak istiyorum.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex-1 justify-center py-3"
                >
                  <MessageCircle size={18} />
                  WhatsApp&#39;tan Teklif Al
                </a>
                <Link
                  href={`/iletisim?product=${encodeURIComponent(selectedProduct.name)}`}
                  className="btn-primary flex-1 justify-center py-3"
                >
                  <Mail size={18} />
                  E-Posta Teklifi İste
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
