'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FaqItem } from '@/lib/types';

type FaqListProps = {
  faq: FaqItem[];
};

export default function FaqList({ faq }: FaqListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (faq.length === 0) {
    return (
      <div className="text-center py-12 text-charcoal-400">
        <HelpCircle size={48} className="mx-auto mb-4 text-kraft-300" />
        <p>Henüz soru eklenmemiş.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faq.map((item) => (
        <div key={item.id} className="accordion-item">
          <button
            onClick={() => toggleFaq(item.id)}
            className="accordion-trigger"
            aria-expanded={openId === item.id}
          >
            <div className="flex items-center gap-3 pr-4">
              <HelpCircle size={20} className="text-kraft-500 shrink-0" />
              <span>{item.question}</span>
            </div>
            <ChevronDown
              size={20}
              className={`text-charcoal-400 shrink-0 transition-transform duration-300 ${
                openId === item.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div className={`accordion-content ${openId === item.id ? 'open' : ''}`}>
            <div className="accordion-content-inner">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
