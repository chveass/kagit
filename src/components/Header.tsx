'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu, X, Phone, Mail, ChevronDown,
  Package, Home, Building2, Award, HelpCircle, MessageSquare
} from 'lucide-react';

import type { SiteSettings } from '@/lib/types';

const navItems = [
  { href: '/', label: 'Ana Sayfa', icon: Home },
  { href: '/kurumsal', label: 'Kurumsal', icon: Building2 },
  { href: '/urunler', label: 'Ürünler', icon: Package },
  { href: '/kalite', label: 'Kalite', icon: Award },
  { href: '/sss', label: 'SSS', icon: HelpCircle },
  { href: '/iletisim', label: 'İletişim', icon: MessageSquare },
];

export default function Header({ settings }: { settings?: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('/');

  const phone = settings?.phone || '0541 640 39 69';
  const email = settings?.email || 'zeraith1@gmail.com';
  const workingHours = settings?.workingHours || 'Pazartesi - Cumartesi: 08:00 - 18:00';
  const telHref = `tel:${phone.replace(/\s+/g, '')}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveSection(window.location.pathname);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-charcoal-800 text-cream-200 text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={telHref} className="flex items-center gap-1.5 hover:text-kraft-300 transition-colors">
              <Phone size={14} />
              <span>{phone}</span>
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-kraft-300 transition-colors">
              <Mail size={14} />
              <span>{email}</span>
            </a>
          </div>
          <span className="text-charcoal-400">{workingHours}</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-lg shadow-kraft-200/20'
            : 'bg-cream-50/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-14 w-20 transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo-icon-transparent.png"
                  alt="Murat Kağıtçılık"
                  fill
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-charcoal-800 leading-none">
                  Murat
                </span>
                <span className="text-[11px] text-kraft-600 font-bold tracking-[0.1em] uppercase mt-0.5 whitespace-nowrap">
                  Kağıtçılık & Plastik
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.href
                      ? 'bg-kraft-100 text-kraft-700'
                      : 'text-charcoal-600 hover:bg-kraft-50 hover:text-kraft-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/iletisim#teklif" className="btn-primary text-sm">
                <MessageSquare size={16} />
                Teklif Al
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-kraft-100 transition-colors"
              aria-label="Menüyü aç/kapat"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 border-t border-kraft-100' : 'max-h-0'
          }`}
        >
          <nav className="px-6 py-4 space-y-1 bg-cream-50/98 backdrop-blur-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.href
                      ? 'bg-kraft-100 text-kraft-700'
                      : 'text-charcoal-600 hover:bg-kraft-50'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-kraft-100">
              <Link
                href="/iletisim#teklif"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-sm w-full justify-center"
              >
                <MessageSquare size={16} />
                Teklif Al
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
