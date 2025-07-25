import { type Category, type InsertCategory, type Product, type InsertProduct, type AdminSession, type InsertAdminSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Admin Sessions
  createAdminSession(session: InsertAdminSession): Promise<AdminSession>;
  getAdminSession(id: string): Promise<AdminSession | undefined>;
  deleteAdminSession(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private adminSessions: Map<string, AdminSession>;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.adminSessions = new Map();
    this.initializeData();
  }

  private async initializeData() {
    // Initialize categories
    const categoriesData = [
      { name: "Moda & Estilo", emoji: "👗", description: "Roupas, acessórios e tendências", slug: "moda" },
      { name: "Casa & Decoração", emoji: "🛋", description: "Itens para deixar sua casa linda", slug: "casa" },
      { name: "Tecnologia", emoji: "📱", description: "Gadgets e eletrônicos incríveis", slug: "tecnologia" },
      { name: "Beleza & Cuidados", emoji: "💄", description: "Produtos de beleza e autocuidado", slug: "beleza" },
      { name: "Promoções Relâmpago", emoji: "🎯", description: "Ofertas imperdíveis por tempo limitado", slug: "promocoes" }
    ];

    for (const cat of categoriesData) {
      await this.createCategory(cat);
    }

    // Produtos serão adicionados conforme necessário - começando sem produtos fictícios
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.categoryId === categoryId);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async createAdminSession(insertSession: InsertAdminSession): Promise<AdminSession> {
    const id = randomUUID();
    const session: AdminSession = { 
      ...insertSession, 
      id,
      createdAt: new Date()
    };
    this.adminSessions.set(id, session);
    return session;
  }

  async getAdminSession(id: string): Promise<AdminSession | undefined> {
    return this.adminSessions.get(id);
  }

  async deleteAdminSession(id: string): Promise<void> {
    this.adminSessions.delete(id);
  }
}

export const storage = new MemStorage();
