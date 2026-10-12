import type { Metadata } from 'next';
import { connection } from 'next/server';
import { Award, Beaker, Factory, ShieldCheck, Leaf, CheckCircle2, Microscope, Recycle } from 'lucide-react';
import { getSettings } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Kalite | Murat Kağıtçılık & Plastik',
  description: 'Murat Kağıtçılık & Plastik üretim standartları, ham madde kalitesi ve dayanıklılık testleri hakkında bilgi.',
};

const qualityPoints = [
  {
    icon: Award,
    title: 'Birinci Sınıf Granür Hammadde',
    description: 'Üretimimizde yalnızca yüksek kaliteli granür hammadde kullanıyoruz. Bu, poşetlerimizin yüksek taşıma kapasitesine sahip olmasını sağlar.'
  },
  {
    icon: Factory,
    title: 'Geniş Kapasiteli Üretim',
    description: 'Gelişmiş ekstrüzyon makineleriyle donatılmış tesisimizde, yüksek kapasiteli ve hassas imalat gerçekleştiriyoruz.'
  },
  {
    icon: Microscope,
    title: 'Dayanıklılık Testleri',
    description: 'Her üretim partisi, çekme ve yırtılma testlerinden geçirilerek müşterilerimize en sağlam ürünleri sunuyoruz.'
  },
  {
    icon: Recycle,
    title: 'Geri Dönüştürülebilir Malzeme',
    description: 'Ürettiğimiz plastik poşetler, geri dönüşüme uygun yapısıyla yeniden değerlendirilebilir özelliktedir.'
  },
];

export default async function KalitePage() {
  await connection();
  const settings = getSettings();
  const title = settings.qualityTitle || 'Kalite Politikamız';
  const text = settings.qualityText;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-kraft-50 to-cream-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-forest-200/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-block text-sm text-kraft-600 font-semibold uppercase tracking-wider mb-3">
            Kalite Standartlarımız
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Üretim
            <span className="block text-kraft-600">Kalitemiz</span>
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl">
            Hammadde seçiminden nihai ürüne kadar her aşamada en yüksek kalite standartlarını benimsiyoruz.
          </p>
        </div>
      </section>

      {/* Quality Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title mb-6">{title}</h2>
            <p className="text-charcoal-600 leading-relaxed text-lg">
              {text || 'Murat Kağıtçılık & Plastik olarak, üretim süreçlerimizde en yüksek kalite standartlarını benimsiyoruz. Hammadde seçiminden nihai ürüne kadar her aşamada titiz kalite kontrol uygulamalarımızla, müşterilerimize dayanıklı ve güvenilir ambalaj çözümleri sunuyoruz.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {qualityPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="card p-8 flex gap-5 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-kraft-100 to-kraft-200 flex items-center justify-center group-hover:from-kraft-200 group-hover:to-kraft-300 transition-all">
                    <Icon size={24} className="text-kraft-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal-800 mb-2">{point.title}</h3>
                    <p className="text-charcoal-500 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Production Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Üretim Sürecimiz</h2>
            <p className="section-subtitle mx-auto">
              Hammaddeden ürüne, kaliteli üretim adımlarımız.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Hammadde Seçimi', desc: 'Poşet imalatı için en uygun, yüksek dayanıklı granür hammaddeler seçilir.', icon: Beaker },
              { step: '02', title: 'İmalat Süreci', desc: 'Ekstrüzyon ve kesim makineleriyle istenilen ebatta üretim sağlanır.', icon: Factory },
              { step: '03', title: 'Dayanıklılık Kontrolü', desc: 'Üretilen poşetlerin taşıma ve sızdırmazlık kapasiteleri test edilir.', icon: ShieldCheck },
              { step: '04', title: 'Paketleme & Sevk', desc: 'Sayımı yapılan ürünler çuvallanarak sevkiyata hazır hale getirilir.', icon: CheckCircle2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-kraft-100 to-kraft-200 flex items-center justify-center group-hover:from-kraft-200 group-hover:to-kraft-300 transition-all">
                      <Icon size={28} className="text-kraft-600" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-kraft-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-charcoal-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
