import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplashScreen from "@/components/SplashScreen";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://muratkagitcilik.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Murat Kağıtçılık & Plastik | Toptan Granür Poşet & Ambalaj İmalatı",
    template: "%s | Murat Kağıtçılık & Plastik",
  },
  description:
    "Murat Kağıtçılık & Plastik - 1974'ten bu yana Konya'da kaliteli granür poşet, plastik ambalaj ve toptan poşet üretimi. Hızlı teslimat ve uygun fiyat teklifleri.",
  keywords: [
    "Murat Kağıtçılık",
    "Murat Kağıtçılık ve Plastik",
    "Murat Kağıtçılık Konya",
    "granür poşet",
    "granür poşet imalatı",
    "poşet üreticisi Konya",
    "toptan poşet üretimi",
    "ambalaj üretimi",
    "plastik poşet toptancıları",
    "sanayi poşeti",
    "çöp ve taşıma poşeti imalatı",
    "Konya ambalaj firmaları",
  ],
  authors: [{ name: "Murat Kağıtçılık & Plastik" }],
  creator: "Murat Kağıtçılık & Plastik",
  publisher: "Murat Kağıtçılık & Plastik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Murat Kağıtçılık & Plastik | Toptan Granür Poşet & Ambalaj İmalatı",
    description:
      "1974'ten bu yana Konya'da kaliteli granür poşet ve plastik ambalaj imalatı. Uygun fiyat ve toptan sipariş için hemen teklif alın.",
    url: siteUrl,
    siteName: "Murat Kağıtçılık & Plastik",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murat Kağıtçılık & Plastik",
    description: "Konya'da kaliteli granür poşet ve ambalaj imalatı. 1974'ten bu yana yarım asırlık tecrübe.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Manufacturer", "Organization"],
      "@id": `${siteUrl}/#organization`,
      name: "Murat Kağıtçılık & Plastik",
      alternateName: ["Murat Kağıtçılık", "Murat Kagitcilik"],
      url: siteUrl,
      description:
        "Murat Kağıtçılık & Plastik, 1974 yılından bu yana Konya'da yüksek kapasiteli granür poşet ve ambalaj imalatı alanında faaliyet göstermektedir.",
      telephone: "+905416403969",
      email: "zeraith1@gmail.com",
      foundingDate: "1974",
      founder: {
        "@type": "Person",
        name: "Süleyman Yekebaşlı",
      },
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Musalla Bağları Mah. Toptancılar Sit.",
          addressLocality: "Selçuklu",
          addressRegion: "Konya",
          addressCountry: "TR",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Fevzi Çakmak Mah. Toptan Gıdacılar Sit.",
          addressLocality: "Karatay",
          addressRegion: "Konya",
          addressCountry: "TR",
        },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      priceRange: "₺₺",
      areaServed: {
        "@type": "Country",
        name: "Türkiye",
      },
      sameAs: [
        "https://wa.me/905416403969",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Murat Kağıtçılık & Plastik",
      alternateName: "Murat Kağıtçılık",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "tr-TR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <SplashScreen />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

