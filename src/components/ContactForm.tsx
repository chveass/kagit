'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

type ContactFormProps = {
  initialProduct?: string;
};

const inputClass = 'w-full border border-kraft-200 rounded-xl px-4 py-3 focus:border-kraft-500 focus:ring-1 focus:ring-kraft-500 outline-none transition-all bg-white';

export default function ContactForm({ initialProduct = '' }: ContactFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: initialProduct ? `${initialProduct} hakkında bilgi almak istiyorum.` : '',
    productName: initialProduct,
  });

  const [contactStatus, setContactStatus] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...form })
      });

      if (res.ok) {
        setContactStatus('success');
        setForm({ name: '', email: '', phone: '', message: '', productName: '' });
        setTimeout(() => setContactStatus(''), 5000);
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
  };

  return (
    <form onSubmit={handleContactSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm text-charcoal-600 mb-1.5 font-medium">Ad Soyad *</label>
        <input
          id="contact-name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          placeholder="Adınız ve soyadınız"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-sm text-charcoal-600 mb-1.5 font-medium">E-Posta *</label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder="e-posta@adresiniz.com"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm text-charcoal-600 mb-1.5 font-medium">Telefon *</label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
            placeholder="05XX XXX XX XX"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm text-charcoal-600 mb-1.5 font-medium">Mesajınız *</label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="Mesajınızı yazın..."
        />
      </div>

      <button
        id="contact-submit"
        type="submit"
        disabled={contactStatus === 'sending'}
        className="btn-primary w-full justify-center py-3 disabled:opacity-50"
      >
        {contactStatus === 'sending' ? 'Gönderiliyor...' : (
          <><Send size={16} /> Mesaj Gönder</>
        )}
      </button>

      {contactStatus === 'success' && (
        <div className="flex items-center gap-2 text-forest-600 bg-forest-50 px-4 py-3 rounded-xl text-sm">
          <CheckCircle2 size={16} />
          Mesajınız başarıyla gönderildi!
        </div>
      )}

      {contactStatus === 'error' && (
        <div className="text-red-500 text-sm">
          Bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}
    </form>
  );
}
