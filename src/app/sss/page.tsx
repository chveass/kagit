import type { Metadata } from 'next';
import { connection } from 'next/server';
import { getFaq } from '@/lib/cms';
import FaqList from '@/components/FaqList';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | Murat Kağıtçılık & Plastik',
  description: 'Granür poşet siparişi, minimum sipariş miktarı, teslimat ve üretim süreçleri hakkında sıkça sorulan sorular.',
};

export default async function SSSPage() {
  await connection();

  const faq = getFaq();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-kraft-50 to-cream-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-kraft-200/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-block text-sm text-kraft-600 font-semibold uppercase tracking-wider mb-3">
            SSS
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Sıkça Sorulan
            <span className="block text-kraft-600">Sorular</span>
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl">
            Merak ettiğiniz konularda hızlı cevaplar.
            Burada bulamadığınız sorularınız için bize ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FaqList faq={faq} />
        </div>
      </section>
    </>
  );
}

