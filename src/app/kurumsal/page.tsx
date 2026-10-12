import type { Metadata } from 'next';
import { connection } from 'next/server';
import { Leaf, Shield, Truck, Users, Factory, Recycle, Target, Zap } from 'lucide-react';
import { getSettings } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Kurumsal | Murat Kağıtçılık & Plastik',
  description: 'Murat Kağıtçılık & Plastik hakkında kurumsal bilgiler, vizyonumuz, misyonumuz ve değerlerimiz.',
};

const values = [
  { icon: Shield, title: 'Sağlam ve Dayanıklı', description: 'Ürettiğimiz granür poşetler, en zorlu şartlara bile dayanacak yüksek kaliteli hammaddeden üretilir.' },
  { icon: Factory, title: 'Yüksek Kapasite', description: 'Üretim tesisimizde, büyük veya küçük ölçekli tüm siparişlerinizi karşılayabilecek kapasiteye sahibiz.' },
  { icon: Truck, title: 'Zamanında Teslimat', description: 'Gelişmiş lojistik ağımızla, siparişlerinizi söz verilen sürede kapınıza kadar ulaştırıyoruz.' },
  { icon: Users, title: 'Müşteri Memnuniyeti', description: 'Özel ebat taleplerinizde esnek çözümler sunarak ihtiyaçlarınıza birebir yanıt veriyoruz.' },
];

const milestones = [
  { year: '1974', title: 'Kuruluş', description: 'Kurucumuz Sayın Süleyman Yekebaşlı önderliğinde imalata başladık.' },
  { year: '1995', title: 'Makine Parkuru Büyümesi', description: 'Üretim kapasitemizi artırarak daha geniş bir müşteri ağına ulaştık.' },
  { year: '2010', title: 'Yeni Üretim Tesisi', description: 'Mevcut üretim tesisimize geçiş yaparak kapasitemizi artırdık.' },
  { year: '2024', title: 'Yarım Asırlık Tecrübe', description: 'Sektördeki 50. yılımızı gururla geride bıraktık.' },
];

export default async function KurumsalPage() {
  await connection();
  const settings = getSettings();
  const title = settings.aboutTitle || 'Güvenilir Üretim ve Kalite';
  const text = settings.aboutText;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-kraft-50 to-cream-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-kraft-200/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm text-kraft-600 font-semibold uppercase tracking-wider mb-3">
              Kurumsal
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">
              Murat Kağıtçılık & Plastik
              <span className="block text-kraft-600">Hakkında</span>
            </h1>
            <p className="text-lg text-charcoal-500 leading-relaxed">
              Kurucumuz Sayın Süleyman Yekebaşlı tarafından temelleri atılan firmamız, 1974 yılından bu yana plastik ambalaj sektöründe faaliyet göstermekte olup; granür poşet
              imalatında köklü bir tecrübeye sahiptir.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title mb-6">{title}</h2>
              <div className="space-y-4 text-charcoal-600 leading-relaxed">
                {text ? (
                  text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Yarım asırlık tecrübemiz ve müşteri memnuniyeti odaklı hizmet politikamızla,
                      sektörün güvenilir granür poşet tedarikçisi olmaya devam ediyoruz.
                    </p>
                    <p>
                      Üretim tesisimizde, yüksek kapasiteli ve titiz bir imalat süreci gerçekleştiriyoruz. 
                      Granür hammadde seçiminden poşet kesimine ve nihai ürün paketlemesine kadar her 
                      aşamada özenli bir çalışma sergilemekteyiz.
                    </p>
                    <p>
                      Her sektörün ihtiyacına uygun ebat ve kalınlıklarda dayanıklı granür poşetler üretiyor, 
                      müşterilerimize sağlamlık ve zamanında teslimat garantisi sunuyoruz.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-kraft p-6 text-center">
                <Factory size={32} className="text-kraft-500 mx-auto mb-3" />
                <div className="font-display text-3xl font-bold text-charcoal-800">50+</div>
                <div className="text-sm text-charcoal-500 mt-1">Yıllık Tecrübe</div>
              </div>
              <div className="card-kraft p-6 text-center">
                <Users size={32} className="text-kraft-500 mx-auto mb-3" />
                <div className="font-display text-3xl font-bold text-charcoal-800">500+</div>
                <div className="text-sm text-charcoal-500 mt-1">Mutlu Müşteri</div>
              </div>
              <div className="card-kraft p-6 text-center col-span-2">
                <Shield size={32} className="text-kraft-500 mx-auto mb-3" />
                <div className="font-display text-3xl font-bold text-charcoal-800">1. Sınıf</div>
                <div className="text-sm text-charcoal-500 mt-1">Hammadde Kullanımı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Değerlerimiz</h2>
            <p className="section-subtitle mx-auto">
              İş anlayışımızı şekillendiren temel değerlerimiz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="card p-6 text-center group">
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

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Tarihçemiz</h2>
            <p className="section-subtitle mx-auto">
              Kuruluşumuzdan bugüne kadarki yolculuğumuz.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 items-start">
                <div className="shrink-0 w-20 text-right">
                  <span className="font-display text-xl font-bold text-kraft-600">{milestone.year}</span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-kraft-500 border-4 border-kraft-200 z-10" />
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-kraft-200 absolute top-4" />
                  )}
                </div>
                <div className="card p-5 flex-1 mb-2">
                  <h3 className="font-semibold text-charcoal-800 mb-1">{milestone.title}</h3>
                  <p className="text-sm text-charcoal-500">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
