'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';
import type { Product, Category } from '@/lib/types';

type FeaturedProductsProps = {
  products: Product[];
  categories: Category[];
};

export default function FeaturedProducts({ products, categories }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-kraft-500 text-white shadow-md'
              : 'bg-white text-charcoal-600 border border-kraft-200 hover:border-kraft-400'
          }`}
        >
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.slug
                ? 'bg-kraft-500 text-white shadow-md'
                : 'bg-white text-charcoal-600 border border-kraft-200 hover:border-kraft-400'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="card overflow-hidden group animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
          >
            {/* Product Image Area */}
            <div className="relative aspect-[3/2] w-full bg-[#f5f0e8] flex items-center justify-center overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  decoding="async"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <Package size={56} className="text-kraft-300 group-hover:text-kraft-400 transition-colors" />
              )}

              {/* MOQ Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-charcoal-700 shadow-sm z-10 border border-charcoal-100">
                MOQ: {product.moq.toLocaleString('tr-TR')} KG
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="font-semibold text-lg text-charcoal-800 mb-2 group-hover:text-kraft-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-charcoal-500 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Color Palette */}
              <div className="flex items-center gap-1.5 mb-4">
                {product.colors.slice(0, 5).map((color) => (
                  <div
                    key={color.hex}
                    className="w-6 h-6 rounded-full border-2 border-charcoal-200 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 5 && (
                  <span className="text-xs text-charcoal-400">+{product.colors.length - 5}</span>
                )}
              </div>

              {/* Sizes */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {product.sizes.slice(0, 3).map((size) => (
                  <span key={size} className="text-xs bg-kraft-50 text-kraft-700 px-2 py-1 rounded-md border border-kraft-200">
                    {size}
                  </span>
                ))}
                {product.sizes.length > 3 && (
                  <span className="text-xs text-charcoal-400 py-1">+{product.sizes.length - 3} ebat</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/905416403969?text=${encodeURIComponent(`Merhaba, ${product.name} hakkında bilgi almak istiyorum.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs flex-1 justify-center py-2.5"
                >
                  WhatsApp Teklif
                </a>
                <Link
                  href={`/iletisim?product=${encodeURIComponent(product.name)}`}
                  className="btn-secondary text-xs flex-1 justify-center py-2.5"
                >
                  E-Posta Teklif
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
