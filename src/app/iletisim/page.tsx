import type { Metadata } from 'next';
import {
  Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight
} from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import QuoteForm from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'İletişim & Teklif Al',
  description: 'Murat Kağıtçılık & Plastik iletişim bilgileri. Konya Selçuklu merkez ve Karatay şube adreslerimiz, 0541 640 39 69 telefon hattımız ve anında fiyat teklif formu.',
};

type IletisimPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function IletisimPage({ searchParams }: IletisimPageProps) {
  const params = await searchParams;
  const productParam = params.product;
  const productFromUrl = typeof productParam === 'string' ? productParam : '';

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-kraft-50 to-cream-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-forest-200/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-block text-sm text-kraft-600 font-semibold uppercase tracking-wider mb-3">
            İletişim
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Bize
            <span className="block text-kraft-600">Ulaşın</span>
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl">
            Ürünlerimiz, özel üretim talepleriniz veya herhangi bir konuda bizimle iletişime geçin.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <a href="tel:05416403969" className="card p-6 text-center group cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-kraft-100 flex items-center justify-center group-hover:bg-kraft-200 transition-colors">
                <Phone size={22} className="text-kraft-600" />
              </div>
              <h3 className="font-semibold text-charcoal-800 mb-1">Telefon</h3>
              <p className="text-sm text-kraft-600 font-medium">0541 640 39 69</p>
              <p className="text-xs text-charcoal-400 mt-1">Hemen arayın</p>
            </a>

            <a href="mailto:zeraith1@gmail.com" className="card p-6 text-center group cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-kraft-100 flex items-center justify-center group-hover:bg-kraft-200 transition-colors">
                <Mail size={22} className="text-kraft-600" />
              </div>
              <h3 className="font-semibold text-charcoal-800 mb-1">E-Posta</h3>
              <p className="text-sm text-kraft-600 font-medium">zeraith1@gmail.com</p>
              <p className="text-xs text-charcoal-400 mt-1">7/24 yazabilirsiniz</p>
            </a>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-kraft-100 flex items-center justify-center">
                <MapPin size={22} className="text-kraft-600" />
              </div>
              <h3 className="font-semibold text-charcoal-800 mb-1">Adreslerimiz</h3>
              <p className="text-xs text-charcoal-500 font-medium mt-2">Merkez:</p>
              <p className="text-xs text-charcoal-500">Musalla Bağları Mah. Toptancılar Sit.<br/>Selçuklu / KONYA</p>
              <p className="text-xs text-charcoal-500 font-medium mt-2">Şube:</p>
              <p className="text-xs text-charcoal-500">Fevzi Çakmak Mah. Toptan Gıdacılar Sit.<br/>Karatay / KONYA</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-kraft-100 flex items-center justify-center">
                <Clock size={22} className="text-kraft-600" />
              </div>
              <h3 className="font-semibold text-charcoal-800 mb-1">Çalışma Saatleri</h3>
              <p className="text-sm text-charcoal-500">Pzt - Cmt: 08:00 - 18:00</p>
              <p className="text-xs text-charcoal-400 mt-1">Pazar kapalı</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="section-title text-2xl mb-6">Mesaj Gönderin</h2>
              {/* key remounts the form when the product in the URL changes */}
              <ContactForm key={productFromUrl} initialProduct={productFromUrl} />
            </div>

            {/* Map */}
            <div>
              <h2 className="section-title text-2xl mb-6">Konumumuz</h2>
              <div className="rounded-2xl overflow-hidden border border-kraft-200 shadow-sm h-[400px]">
                <iframe
                  src="https://maps.google.com/maps?q=Murat+Kağıtçılık,+Selçuklu,+Konya&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Murat Kağıtçılık & Plastik Merkez Konum"
                />
              </div>

              {/* WhatsApp Quick Contact */}
              <div className="mt-6 p-6 bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 rounded-2xl border border-[#25D366]/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal-800">WhatsApp ile hızlı iletişim</h3>
                    <p className="text-sm text-charcoal-500">Hemen mesaj gönderin, en kısa sürede dönüş yapalım.</p>
                  </div>
                  <a
                    href="https://wa.me/905416403969?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp text-sm shrink-0"
                  >
                    Yaz
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="teklif" className="py-24 bg-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-kraft-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-sm text-kraft-400 font-semibold uppercase tracking-wider mb-3">
              Teklif Formu
            </span>
            <h2 className="section-title text-white mb-4">Detaylı Teklif İsteyin</h2>
            <p className="section-subtitle text-charcoal-400 mx-auto">
              Ürün, ebat, miktar ve renk bilgilerini girerek hızlıca teklif alın.
            </p>
          </div>

          <QuoteForm key={productFromUrl} initialProduct={productFromUrl} showSize />
        </div>
      </section>
    </>
  );
}
