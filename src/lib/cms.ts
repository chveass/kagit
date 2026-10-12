import fs from 'fs';
import path from 'path';
import { CmsData, Product, FaqItem, ContactSubmission, QuoteRequest, SiteSettings, Category } from './types';
import defaultData from './default-data';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'cms-data.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureDirectories() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
  } catch (err) {
    // Read-only filesystem warning
    console.warn('Filesystem notice: Could not ensure directory (read-only environment):', err);
  }
}

let cachedData: CmsData | null = null;
let cachedMtime = 0;

function readData(): CmsData {
  if (!fs.existsSync(DATA_FILE)) {
    try {
      ensureDirectories();
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    } catch {
      // If filesystem is read-only, return defaultData from memory
      return defaultData;
    }
    cachedData = null;
    return defaultData;
  }

  try {
    const mtime = fs.statSync(DATA_FILE).mtimeMs;

    if (cachedData && mtime === cachedMtime) {
      return cachedData;
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    cachedData = JSON.parse(raw) as CmsData;
    cachedMtime = mtime;
    return cachedData;
  } catch {
    return defaultData;
  }
}

function writeData(data: CmsData): void {
  cachedData = data;
  try {
    ensureDirectories();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    cachedMtime = fs.statSync(DATA_FILE).mtimeMs;
  } catch (err) {
    console.warn('Notice: Could not write to filesystem (read-only environment):', err);
  }
}

// ===== Settings =====
export function getSettings(): SiteSettings {
  const data = readData();
  return data.settings;
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const data = readData();
  data.settings = { ...data.settings, ...settings };
  writeData(data);
  return data.settings;
}

// ===== Categories =====
export function getCategories(): Category[] {
  const data = readData();
  return [...data.categories].sort((a, b) => a.order - b.order);
}

export function addCategory(category: Category): Category {
  const data = readData();
  data.categories.push(category);
  writeData(data);
  return category;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const data = readData();
  const index = data.categories.findIndex(c => c.id === id);

  if (index === -1) {
    return null;
  }

  data.categories[index] = { ...data.categories[index], ...updates };
  writeData(data);
  return data.categories[index];
}

export function deleteCategory(id: string): boolean {
  const data = readData();
  const initialLength = data.categories.length;
  data.categories = data.categories.filter(c => c.id !== id);

  if (data.categories.length < initialLength) {
    writeData(data);
    return true;
  }

  return false;
}

// ===== Products =====
export function getProducts(): Product[] {
  const data = readData();
  return data.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  const data = readData();
  return data.products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const data = readData();
  return data.products.filter(p => p.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  const data = readData();
  return data.products.filter(p => p.featured);
}

export function addProduct(product: Product): Product {
  const data = readData();
  data.products.push(product);
  writeData(data);
  return product;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const data = readData();
  const index = data.products.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  data.products[index] = { ...data.products[index], ...updates, updatedAt: new Date().toISOString() };
  writeData(data);
  return data.products[index];
}

export function deleteProduct(id: string): boolean {
  const data = readData();
  const initialLength = data.products.length;
  data.products = data.products.filter(p => p.id !== id);

  if (data.products.length < initialLength) {
    writeData(data);
    return true;
  }

  return false;
}

// ===== FAQ =====
export function getFaq(): FaqItem[] {
  const data = readData();
  return [...data.faq].sort((a, b) => a.order - b.order);
}

export function addFaqItem(item: FaqItem): FaqItem {
  const data = readData();
  data.faq.push(item);
  writeData(data);
  return item;
}

export function updateFaqItem(id: string, updates: Partial<FaqItem>): FaqItem | null {
  const data = readData();
  const index = data.faq.findIndex(f => f.id === id);

  if (index === -1) {
    return null;
  }

  data.faq[index] = { ...data.faq[index], ...updates };
  writeData(data);
  return data.faq[index];
}

export function deleteFaqItem(id: string): boolean {
  const data = readData();
  const initialLength = data.faq.length;
  data.faq = data.faq.filter(f => f.id !== id);

  if (data.faq.length < initialLength) {
    writeData(data);
    return true;
  }

  return false;
}

// ===== Contacts =====
export function getContacts(): ContactSubmission[] {
  const data = readData();
  return [...data.contacts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addContact(contact: ContactSubmission): ContactSubmission {
  const data = readData();
  data.contacts.push(contact);
  writeData(data);
  return contact;
}

export function markContactRead(id: string): boolean {
  const data = readData();
  const contact = data.contacts.find(c => c.id === id);

  if (!contact) {
    return false;
  }

  contact.read = true;
  writeData(data);
  return true;
}

// ===== Quotes =====
export function getQuotes(): QuoteRequest[] {
  const data = readData();
  return [...data.quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addQuote(quote: QuoteRequest): QuoteRequest {
  const data = readData();
  data.quotes.push(quote);
  writeData(data);
  return quote;
}

export function markQuoteRead(id: string): boolean {
  const data = readData();
  const quote = data.quotes.find(q => q.id === id);

  if (!quote) {
    return false;
  }

  quote.read = true;
  writeData(data);
  return true;
}

// ===== Admin =====
export function getAdminUsers() {
  const data = readData();
  return data.admin;
}

export function addAdminUser(user: { id: string; username: string; passwordHash: string }) {
  const data = readData();
  data.admin.push({ ...user, createdAt: new Date().toISOString() });
  writeData(data);
}

export function findAdminByUsername(username: string) {
  const data = readData();
  return data.admin.find(a => a.username === username);
}
