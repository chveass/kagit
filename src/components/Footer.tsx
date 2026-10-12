import Link from 'next/link';
import Image from 'next/image';
import { Package, Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const footerLinks = [
  {
    title: 'Hızlı Erişim',
    links: [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Kurumsal', href: '/kurumsal' },
      { label: 'Ürünler', href: '/urunler' },
      { label: 'Kalite', href: '/kalite' },
      { label: 'SSS', href: '/sss' },
    ],
  },
  {
    title: 'Ürünlerimiz',
    links: [
      { label: 'Standart Boy Poşetler', href: '/urunler' },
      { label: 'Büyük Boy Poşetler', href: '/urunler' },
      { label: 'Battal & Jumbo Boy', href: '/urunler' },
      { label: 'Çöp Poşetleri', href: '/urunler' },
      { label: 'Özel Ebat İmalat', href: '/urunler' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-charcoal-300 relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="h-1 bg-gradient-to-r from-kraft-400 via-kraft-500 to-forest-500" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative h-14 w-20 transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo-icon-transparent.png"
                  alt="Murat Kağıtçılık"
                  fill
                  className="object-contain brightness-0 invert opacity-90"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-white leading-none tracking-wide">
                  Murat
                </span>
                <span className="text-[11px] text-kraft-400 font-bold tracking-[0.1em] uppercase mt-0.5 whitespace-nowrap">
                  Kağıtçılık & Plastik
                </span>
              </div>
            </Link>
            <p className="text-sm text-charcoal-400 leading-relaxed mb-6">
              Profesyonel ambalaj ve kağıt ürünleri imalatında güvenilir çözüm ortağınız.
              Çevre dostu üretim anlayışıyla hizmetinizdeyiz.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:05416403969" className="flex items-center gap-2 hover:text-kraft-300 transition-colors">
                <Phone size={14} className="text-kraft-500" />
                0541 640 39 69
              </a>
              <a href="mailto:zeraith1@gmail.com" className="flex items-center gap-2 hover:text-kraft-300 transition-colors">
                <Mail size={14} className="text-kraft-500" />
                zeraith1@gmail.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-kraft-500 mt-1 shrink-0" />
                <div className="flex flex-col gap-1 text-xs">
                  <span><strong>Merkez:</strong> Musalla Bağları Mah., Toptancılar Sit., Selçuklu / KONYA</span>
                  <span><strong>Şube:</strong> Fevzi Çakmak Mah., Toptan Gıdacılar Sit., Karatay / KONYA</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-kraft-500" />
                Pzt - Cmt: 08:00 - 18:00
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal-400 hover:text-kraft-300 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Bize Ulaşın
            </h3>
            <p className="text-sm text-charcoal-400 mb-4 leading-relaxed">
              Ürünlerimiz ve özel üretim talepleriniz hakkında bizimle iletişime geçin.
            </p>
            <Link
              href="/iletisim"
              className="btn-primary text-sm"
            >
              İletişim
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-charcoal-500">
            <p>© {new Date().getFullYear()} Murat Kağıtçılık & Plastik. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
