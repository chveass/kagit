import Link from 'next/link';
import { connection } from 'next/server';
import {
  ArrowRight, Leaf, Shield, Truck, Users,
  Package, ChevronRight, Star, Factory
} from 'lucide-react';
import { getFeaturedProducts, getCategories } from '@/lib/cms';
import FeaturedProducts from '@/components/FeaturedProducts';
import QuoteForm from '@/components/QuoteForm';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Leaf, Shield, Truck, Users, Factory
};

const aboutValues = [
  { icon: 'Shield', title: 'Sağlam ve Dayanıklı', description: 'Ürettiğimiz granür poşetler, yüksek taşıma kapasitesine sahip kaliteli hammaddeden üretilir.' },
  { icon: 'Factory', title: 'Yüksek Kapasite', description: 'Üretim tesisimizde, büyük veya küçük ölçekli tüm granür poşet siparişlerinizi karşılıyoruz.' },
  { icon: 'Truck', title: 'Zamanında Teslimat', description: 'Siparişlerinizi söz verdiğimiz tarihte, eksiksiz bir şekilde ulaştırıyoruz.' },
  { icon: 'Users', title: 'Müşteri Memnuniyeti', description: '1974 yılından bu yana, müşterilerimizin taleplerini dinliyor ve onlara en uygun ebatlarda üretim yapıyoruz.' },
];

export default async function HomePage() {
  // CMS data changes from the admin panel, so render on each request
  await connection();

  const products = getFeaturedProducts();
  const categories = getCategories();

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-kraft-50 to-orange-50 min-h-[90vh] flex items-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-kraft-300/15 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-kraft-50 border border-kraft-200 rounded-full text-sm text-kraft-700 font-medium">
                <Star size={16} />
                Yarım Asırlık Tecrübe
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal-900 leading-tight tracking-tight">
                Murat Kağıtçılık & Plastik
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-3 text-charcoal-700 font-semibold tracking-normal leading-snug">
                  Profesyonel
                  <span className="inline-block bg-gradient-to-r from-kraft-500 to-kraft-700 bg-clip-text text-transparent mx-2">
                    Granür Poşet
                  </span>
                  İmalatı
                </span>
              </h1>

              <p className="text-lg text-charcoal-500 leading-relaxed max-w-lg">
                Granür poşet imalatında 
                <span className="inline-block bg-kraft-100 text-kraft-800 font-bold px-2 py-0.5 rounded ml-1 mr-1 text-xl border border-kraft-200 shadow-sm">1974&apos;ten bu yana</span>
                kaliteden ödün vermeden, müşteri odaklı üretim anlayışıyla hizmetinizdeyiz.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/iletisim#teklif" className="btn-primary text-base px-8 py-4">
                  Hızlı Teklif Al
                  <ArrowRight size={18} />
                </Link>
                <Link href="/urunler" className="btn-secondary text-base px-8 py-4">
                  Ürünleri İncele
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                {[
                  { value: '50+', label: 'Yıllık Tecrübe' },
                  { value: '500+', label: 'Mutlu Müşteri' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-2xl font-bold text-kraft-600">{stat.value}</div>
                    <div className="text-sm text-charcoal-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Static Hero Visual */}
            <div className="relative animate-fade-in-up delay-200" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <div className="relative h-[450px] bg-gradient-to-br from-white/60 to-cream-100/60 backdrop-blur-sm rounded-3xl border border-kraft-200/50 shadow-2xl shadow-kraft-200/20 p-4 flex items-center justify-center overflow-hidden">
                {/* Decorative background elements inside the box */}
                <div className="absolute inset-0 opacity-10 kraft-texture" />
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-kraft-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000" />
                
                {/* Central Icon/Visual */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-kraft-100 to-kraft-300 rounded-2xl rotate-3 shadow-xl flex items-center justify-center mb-6">
                    <div className="w-full h-full bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/50 -rotate-6 transition-transform hover:rotate-0 duration-500">
                      <Package size={64} className="text-kraft-700" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-display font-bold text-xl text-charcoal-800 tracking-tight">Dayanıklı & Kaliteli</h3>
                    <p className="text-kraft-600 font-medium">Granür Poşetler</p>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-3 border border-kraft-100 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-kraft-100 flex items-center justify-center">
                    <Shield size={16} className="text-kraft-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal-700">Yüksek Dayanıklılık</p>
                    <p className="text-[10px] text-charcoal-400">Özenli üretim</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-3 border border-kraft-100 animate-float delay-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-kraft-100 flex items-center justify-center">
                    <Star size={16} className="text-kraft-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal-700">Premium Kalite</p>
                    <p className="text-[10px] text-charcoal-400">G1 hammadde</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORPORATE SUMMARY ===== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block text-sm text-kraft-600 font-semibold uppercase tracking-wider mb-3">
              Neden Biz?
            </span>
            <h2 className="section-title mb-4">Güvenilir Çözüm Ortağınız</h2>
            <p className="section-subtitle mx-auto">
              Sürdürülebilir ambalaj üretiminde kalite, güven ve yenilikçilik bir arada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutValues.map((value, index) => {
              const Icon = iconMap[value.icon] || Package;
              return (
                <div
                  key={value.title}
                  className="card p-6 text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-kraft-100 to-kraft-200 flex items-center justify-center group-hover:from-kraft-200 group-hover:to-kraft-300 transition-all">
                    <Icon size={24} className="text-kraft-600" />
                  </div>
                  <h3 className="font-semibold text-charcoal-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-24 bg-gradient-to-b from-cream-50 to-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-sm text-kraft-600 font-semibold uppercase tracking-wider mb-3">
              Ürünlerimiz
            </span>
            <h2 className="section-title mb-4">Öne Çıkan Ürünler</h2>
            <p className="section-subtitle mx-auto">
              Geniş ürün yelpazemizden size en uygun ambalaj çözümünü bulun.
            </p>
          </div>

          <FeaturedProducts products={products} categories={categories} />

          {/* View All */}
          <div className="text-center mt-12">
            <Link href="/urunler" className="btn-secondary text-base px-8 py-3">
              Tüm Ürünleri Görüntüle
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUICK QUOTE FORM ===== */}
      <section id="teklif" className="py-24 bg-charcoal-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-kraft-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-forest-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-sm text-kraft-400 font-semibold uppercase tracking-wider mb-3">
              Hızlı Teklif
            </span>
            <h2 className="section-title text-white mb-4">Teklif İsteyin</h2>
            <p className="section-subtitle text-charcoal-400 mx-auto">
              Ürünlerimiz hakkında detaylı bilgi ve fiyat teklifi almak için formu doldurun.
            </p>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  );
}
