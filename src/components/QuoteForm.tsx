'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

type QuoteFormProps = {
  initialProduct?: string;
  showSize?: boolean;
};

const inputClass = 'w-full bg-charcoal-800 border border-charcoal-700 rounded-xl px-4 py-3 text-white placeholder:text-charcoal-500 focus:border-kraft-500 focus:ring-1 focus:ring-kraft-500 outline-none transition-all';

export default function QuoteForm({ initialProduct = '', showSize = false }: QuoteFormProps) {
  const emptyForm = {
    name: '', company: '', email: '', phone: '', productName: initialProduct, quantity: '', size: '', message: ''
  };

  const [quoteForm, setQuoteForm] = useState(emptyForm);
  const [quoteStatus, setQuoteStatus] = useState<string>('');

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setQuoteForm(prev => ({ ...prev, [field]: value }));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'quote', ...quoteForm })
      });

      if (res.ok) {
        setQuoteStatus('success');
        setQuoteForm({ ...emptyForm, productName: '' });
        setTimeout(() => setQuoteStatus(''), 5000);
      } else {
        setQuoteStatus('error');
      }
    } catch {
      setQuoteStatus('error');
    }
  };

  return (
    <form onSubmit={handleQuoteSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="quote-name" className="block text-sm text-charcoal-300 mb-2 font-medium">Ad Soyad *</label>
          <input
            id="quote-name"
            type="text"
            required
            value={quoteForm.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={inputClass}
            placeholder="Adınız ve soyadınız"
          />
        </div>
        <div>
          <label htmlFor="quote-company" className="block text-sm text-charcoal-300 mb-2 font-medium">Firma</label>
          <input
            id="quote-company"
            type="text"
            value={quoteForm.company}
            onChange={(e) => updateField('company', e.target.value)}
            className={inputClass}
            placeholder="Firma adınız"
          />
        </div>
        <div>
          <label htmlFor="quote-email" className="block text-sm text-charcoal-300 mb-2 font-medium">E-Posta *</label>
          <input
            id="quote-email"
            type="email"
            required
            value={quoteForm.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={inputClass}
            placeholder="e-posta@adresiniz.com"
          />
        </div>
        <div>
          <label htmlFor="quote-phone" className="block text-sm text-charcoal-300 mb-2 font-medium">Telefon *</label>
          <input
            id="quote-phone"
            type="tel"
            required
            value={quoteForm.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className={inputClass}
            placeholder="05XX XXX XX XX"
          />
        </div>
        <div>
          <label htmlFor="quote-product" className="block text-sm text-charcoal-300 mb-2 font-medium">Ürün</label>
          <input
            id="quote-product"
            type="text"
            value={quoteForm.productName}
            onChange={(e) => updateField('productName', e.target.value)}
            className={inputClass}
            placeholder="İlgilendiğiniz ürün"
          />
        </div>
        <div>
          <label htmlFor="quote-quantity" className="block text-sm text-charcoal-300 mb-2 font-medium">Miktar</label>
          <input
            id="quote-quantity"
            type="text"
            value={quoteForm.quantity}
            onChange={(e) => updateField('quantity', e.target.value)}
            className={inputClass}
            placeholder="Talep ettiğiniz miktar"
          />
        </div>
      </div>

      {showSize && (
        <div>
          <label htmlFor="quote-size" className="block text-sm text-charcoal-300 mb-2 font-medium">Ebat Tercihi</label>
          <input
            id="quote-size"
            type="text"
            value={quoteForm.size}
            onChange={(e) => updateField('size', e.target.value)}
            className={inputClass}
            placeholder="Ör: 30x40 cm, özel ebat talebi"
          />
        </div>
      )}

      <div>
        <label htmlFor="quote-message" className="block text-sm text-charcoal-300 mb-2 font-medium">Mesaj</label>
        <textarea
          id="quote-message"
          rows={4}
          value={quoteForm.message}
          onChange={(e) => updateField('message', e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Ebat, kalınlık, renk veya diğer istekleriniz..."
        />
      </div>

      <div className="text-center">
        <button
          id="quote-submit"
          type="submit"
          disabled={quoteStatus === 'sending'}
          className="btn-primary text-base px-10 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {quoteStatus === 'sending' ? (
            <>Gönderiliyor...</>
          ) : (
            <>
              <Send size={18} />
              Teklif İsteği Gönder
            </>
          )}
        </button>
      </div>

      {quoteStatus === 'success' && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-forest-500/10 border border-forest-500/20 text-forest-400 px-6 py-3 rounded-xl">
            <CheckCircle2 size={18} />
            Teklif talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
          </div>
        </div>
      )}

      {quoteStatus === 'error' && (
        <div className="text-center text-red-400 text-sm">
          Bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}
    </form>
  );
}
