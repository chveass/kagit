import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "Murat Kağıtçılık & Plastik | Profesyonel Ambalaj & Kağıt Ürünleri",
  description: "Granür poşet, kraft ambalaj ve özel kağıt ürünlerinde 20 yılı aşkın tecrübeyle, çevre dostu üretim anlayışıyla hizmetinizdeyiz. Kaliteli ambalaj çözümleri için Murat Kağıtçılık & Plastik.",
  keywords: "ambalaj, kağıt, granür poşet, kraft, poşet imalatı, ambalaj üretimi",
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
