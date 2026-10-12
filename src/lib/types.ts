// CMS Data Types
export interface SiteSettings {
  companyName: string;
  slogan: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  workingHours: string;
  mapEmbedUrl: string;
  aboutTitle: string;
  aboutText: string;
  aboutValues: { icon: string; title: string; description: string }[];
  qualityTitle: string;
  qualityText: string;
  qualityPoints: { title: string; description: string }[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  moq: number;
  images: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productName?: string;
  createdAt: string;
  read: boolean;
}

export interface QuoteRequest {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  productName?: string;
  quantity?: string;
  size?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

// CMS Data Store shape
export interface CmsData {
  settings: SiteSettings;
  products: Product[];
  categories: Category[];
  faq: FaqItem[];
  contacts: ContactSubmission[];
  quotes: QuoteRequest[];
  admin: AdminUser[];
}
