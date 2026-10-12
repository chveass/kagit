import { CmsData } from './types';
import { v4 as uuidv4 } from 'uuid';

const defaultData: CmsData = {
  settings: {
    companyName: "Murat Kağıtçılık & Plastik",
    slogan: "Kaliteli Ambalaj, Güvenilir Çözüm",
    heroTitle: "Profesyonel Granür Poşet İmalatı",
    heroSubtitle: "Granür poşet imalatında 1974'ten bu yana kaliteden ödün vermeden, müşteri odaklı üretim anlayışıyla hizmetinizdeyiz.",
    heroCtaText: "Hızlı Teklif Al",
    phone: "0541 640 39 69",
    email: "zeraith1@gmail.com",
    address: "Merkez: Musalla Bağları Mah., Selçuklu / KONYA | Şube: Fevzi Çakmak Mah., Karatay / KONYA",
    whatsappNumber: "905416403969",
    workingHours: "Pazartesi - Cumartesi: 08:00 - 18:00",
    mapEmbedUrl: "https://maps.google.com/maps?q=Murat+Kağıtçılık,+Selçuklu,+Konya&t=&z=15&ie=UTF8&iwloc=&output=embed",
    aboutTitle: "Murat Kağıtçılık & Plastik Hakkında",
    aboutText: "Kurucumuz Sayın Süleyman Yekebaşlı tarafından temelleri atılan firmamız, 1974 yılından bu yana plastik ambalaj sektöründe faaliyet göstermekte olup; granür poşet imalatında köklü bir tecrübeye sahiptir.",
    aboutValues: [
      {
        icon: "Shield",
        title: "Sağlam ve Dayanıklı",
        description: "Ürettiğimiz granür poşetler, en zorlu şartlara bile dayanacak yüksek kaliteli hammaddeden üretilir."
      },
      {
        icon: "Factory",
        title: "Yüksek Kapasite",
        description: "Üretim tesisimizde, büyük veya küçük ölçekli tüm siparişlerinizi karşılayabilecek kapasiteye sahibiz."
      },
      {
        icon: "Truck",
        title: "Zamanında Teslimat",
        description: "Gelişmiş lojistik ağımızla, siparişlerinizi söz verilen sürede kapınıza kadar ulaştırıyoruz."
      },
      {
        icon: "Users",
        title: "Müşteri Memnuniyeti",
        description: "Özel ebat taleplerinizde esnek çözümler sunarak ihtiyaçlarınıza birebir yanıt veriyoruz."
      }
    ],
    qualityTitle: "Güvenilir Üretim ve Kalite",
    qualityText: "Yarım asırlık tecrübemiz ve müşteri memnuniyeti odaklı hizmet politikamızla, sektörün güvenilir granür poşet tedarikçisi olmaya devam ediyoruz.",
    qualityPoints: [
      {
        title: "Birinci Sınıf Granür Hammadde",
        description: "Üretimimizde yalnızca yüksek kaliteli granür hammadde kullanıyoruz. Bu, poşetlerimizin yüksek taşıma kapasitesine sahip olmasını sağlar."
      },
      {
        title: "Geniş Kapasiteli Üretim",
        description: "Gelişmiş ekstrüzyon makineleriyle donatılmış tesisimizde, yüksek kapasiteli ve hassas imalat gerçekleştiriyoruz."
      },
      {
        title: "Dayanıklılık Testleri",
        description: "Her üretim partisi, çekme ve yırtılma testlerinden geçirilerek müşterilerimize en sağlam ürünleri sunuyoruz."
      },
      {
        title: "Geri Dönüştürülebilir Malzeme",
        description: "Ürettiğimiz plastik poşetler, geri dönüşüme uygun yapısıyla yeniden değerlendirilebilir özelliktedir."
      }
    ]
  },
  products: [
    {
      id: uuidv4(),
      name: "Minik Boy Granür Poşet",
      slug: "minik-boy-poset",
      category: "standart-boy",
      description: "20x35 cm ebatlarında, siyah ve sarı renk seçenekleriyle üretilen minik boy granür poşet. Günlük kullanım için idealdir.",
      sizes: ["20x35 cm"],
      colors: [
        { name: "Siyah", hex: "#2d2d2d" },
        { name: "Sarı", hex: "#f1c40f" }
      ],
      moq: 500,
      images: ["/images/Minik.png"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Küçük Boy Granür Poşet",
      slug: "kucuk-boy-poset",
      category: "standart-boy",
      description: "25x40 cm ebatlarında üretilen, yüksek taşıma kapasitesine sahip küçük boy granür poşet.",
      sizes: ["25x40 cm"],
      colors: [
        { name: "Kırmızı", hex: "#c0392b" },
        { name: "Beyaz", hex: "#ffffff" },
        { name: "Siyah", hex: "#2d2d2d" }
      ],
      moq: 500,
      images: ["/images/Kucuk.png"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Orta Boy Granür Poşet",
      slug: "orta-boy-poset",
      category: "standart-boy",
      description: "30x50 cm ebatlarındaki orta boy granür poşet, en çok tercih edilen çok amaçlı taşıma çözümüdür.",
      sizes: ["30x50 cm"],
      colors: [
        { name: "Yeşil", hex: "#27ae60" },
        { name: "Beyaz", hex: "#ffffff" },
        { name: "Siyah", hex: "#2d2d2d" }
      ],
      moq: 500,
      images: ["/images/Orta.png"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Büyük Boy Granür Poşet",
      slug: "buyuk-boy-poset",
      category: "buyuk-boy",
      description: "35x60 cm ölçülerinde, ağır yük taşıma kapasitesine sahip, dayanıklı büyük boy ambalaj poşeti.",
      sizes: ["35x60 cm"],
      colors: [
        { name: "Sarı", hex: "#f1c40f" },
        { name: "Beyaz", hex: "#ffffff" },
        { name: "Siyah", hex: "#2d2d2d" }
      ],
      moq: 500,
      images: ["/images/Buyuk.png"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Battal Boy Granür Poşet",
      slug: "battal-boy-poset",
      category: "buyuk-boy",
      description: "40x70 cm geniş hacimli battal boy poşet. Endüstriyel ve toptan satış kullanımlarına uygundur.",
      sizes: ["40x70 cm"],
      colors: [
        { name: "Mavi", hex: "#4a7fb5" },
        { name: "Beyaz", hex: "#ffffff" },
        { name: "Siyah", hex: "#2d2d2d" }
      ],
      moq: 500,
      images: ["/images/Battal.png"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Jumbo Boy Granür Poşet",
      slug: "jumbo-boy-poset",
      category: "buyuk-boy",
      description: "80x110 cm ekstra büyük ebat. Ağır sanayi, tekstil ve büyük hacimli ürünlerin sevkiyatı için üretilmiştir.",
      sizes: ["80x110 cm"],
      colors: [
        { name: "Siyah", hex: "#2d2d2d" },
        { name: "Beyaz", hex: "#ffffff" }
      ],
      moq: 500,
      images: ["/images/Jumbo.png"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Çöp Poşeti (80x110)",
      slug: "cop-poseti",
      category: "cop-poseti",
      description: "80x110 cm ebatlarında, sızdırmaz yapılı, ekstra kalın dayanıklı sanayi tipi çöp poşeti.",
      sizes: ["80x110 cm"],
      colors: [
        { name: "Siyah", hex: "#2d2d2d" },
        { name: "Beyaz", hex: "#ffffff" }
      ],
      moq: 500,
      images: ["/images/Cop.png"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  categories: [
    { id: uuidv4(), name: "Standart Boy Poşetler", slug: "standart-boy", description: "Minik, küçük ve orta boy günlük kullanım granür poşetleri", order: 1 },
    { id: uuidv4(), name: "Büyük Boy Poşetler", slug: "buyuk-boy", description: "Büyük, battal ve jumbo boy geniş hacimli poşetler", order: 2 },
    { id: uuidv4(), name: "Çöp Poşetleri", slug: "cop-poseti", description: "Sızdırmaz ve dayanıklı çöp poşetleri", order: 3 }
  ],
  faq: [
    {
      id: uuidv4(),
      question: "Minimum sipariş adedi (MOQ) nedir?",
      answer: "Özel üretim boyutlarda ve renklerdeki granür poşet siparişleriniz için minimum üretim miktarımız 500 KG'dır.",
      order: 1
    },
    {
      id: uuidv4(),
      question: "Özel ebat kesim yapabiliyor musunuz?",
      answer: "Evet, müşterilerimizin taleplerine göre özel ebat ve ölçülerde üretim yapabiliyoruz. Özel ebat siparişleri için lütfen teknik ekibimizle iletişime geçin.",
      order: 2
    },
    {
      id: uuidv4(),
      question: "Teslimat süresi ne kadardır?",
      answer: "Standart ürünlerde teslimat süresi sipariş onayından itibaren 5-7 iş günüdür. Özel üretim siparişlerinde bu süre 10 iş gününe kadar uzayabilir.",
      order: 3
    },
    {
      id: uuidv4(),
      question: "Ürünlerinize baskı yapabiliyor musunuz?",
      answer: "Firmamız bünyesinde baskı ünitesi bulunmamaktadır. Yalnızca baskısız, yüksek dayanımlı granür poşet imalatı gerçekleştirmekteyiz.",
      order: 4
    },
    {
      id: uuidv4(),
      question: "Ödeme koşullarınız nedir?",
      answer: "İlk siparişlerde %50 peşin, kalan %50 sevkiyat öncesi ödeme şeklinde çalışıyoruz. Düzenli müşterilerimize vadeli ödeme seçenekleri sunulmaktadır.",
      order: 5
    }
  ],
  contacts: [],
  quotes: [],
  admin: []
};

export default defaultData;
