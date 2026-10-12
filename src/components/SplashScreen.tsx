'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Add overflow hidden to body while splash is visible
    document.body.style.overflow = 'hidden';
    
    const timer1 = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    const timer2 = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-cream-50 transition-opacity duration-700 ease-in-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center animate-fade-in-up">
        <div className="relative w-48 h-48 md:w-56 md:h-56 drop-shadow-xl mb-6">
          <Image
            src="/images/logo-icon-transparent.png"
            alt="Murat Kağıtçılık Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="font-display font-bold text-5xl md:text-6xl text-charcoal-900 tracking-tight leading-none mb-2">
            MURAT
          </span>
          <span className="text-lg md:text-xl text-kraft-600 font-bold tracking-[0.2em] uppercase">
            Kağıtçılık & Plastik
          </span>
        </div>
      </div>
    </div>
  );
}
