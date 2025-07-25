import { type Category, type InsertCategory, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category>;
  private products: Map<string, Product>;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
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

    // Initialize products
    const modaCategory = Array.from(this.categories.values()).find(c => c.slug === "moda");
    const casaCategory = Array.from(this.categories.values()).find(c => c.slug === "casa"); 
    const tecCategory = Array.from(this.categories.values()).find(c => c.slug === "tecnologia");
    const belezaCategory = Array.from(this.categories.values()).find(c => c.slug === "beleza");
    const promocoesCategory = Array.from(this.categories.values()).find(c => c.slug === "promocoes");

    if (modaCategory) {
      const modaProducts = [
        {
          name: "Vestido Floral Elegante",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 89,90",
          originalPrice: "R$ 149,90",
          rating: 4.8,
          sold: "2.1k vendidos",
          categoryId: modaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        },
        {
          name: "Tênis Esportivo Confortável",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 129,90",
          originalPrice: "R$ 199,90",
          rating: 4.9,
          sold: "5.2k vendidos",
          categoryId: modaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        },
        {
          name: "Bolsa Feminina Premium",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 79,90",
          originalPrice: "R$ 159,90",
          rating: 4.7,
          sold: "1.8k vendidos",
          categoryId: modaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        }
      ];
      
      for (const product of modaProducts) {
        await this.createProduct(product);
      }
    }

    if (casaCategory) {
      const casaProducts = [
        {
          name: "Luminária LED Inteligente",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 59,90",
          originalPrice: "R$ 99,90",
          rating: 4.6,
          sold: "3.4k vendidos",
          categoryId: casaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        },
        {
          name: "Almofada Decorativa Moderna",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 29,90",
          originalPrice: "R$ 49,90",
          rating: 4.5,
          sold: "6.7k vendidos",
          categoryId: casaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        },
        {
          name: "Vaso Decorativo Cerâmica",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 39,90",
          originalPrice: "R$ 79,90",
          rating: 4.8,
          sold: "2.3k vendidos",
          categoryId: casaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        }
      ];
      
      for (const product of casaProducts) {
        await this.createProduct(product);
      }
    }

    if (tecCategory) {
      const tecProducts = [
        {
          name: "Fone Bluetooth Premium",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 149,90",
          originalPrice: "R$ 299,90",
          rating: 4.9,
          sold: "8.1k vendidos",
          categoryId: tecCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        },
        {
          name: "Carregador Wireless Fast",
          image: "https://images.unsplash.com/photo-1609592188967-1d4b47cf2828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 69,90",
          originalPrice: "R$ 129,90",
          rating: 4.7,
          sold: "4.5k vendidos",
          categoryId: tecCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        },
        {
          name: "Smart Watch Fitness",
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 199,90",
          originalPrice: "R$ 399,90",
          rating: 4.8,
          sold: "3.2k vendidos",
          categoryId: tecCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        }
      ];
      
      for (const product of tecProducts) {
        await this.createProduct(product);
      }
    }

    if (belezaCategory) {
      const belezaProducts = [
        {
          name: "Kit Skincare Completo",
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 89,90",
          originalPrice: "R$ 179,90",
          rating: 4.9,
          sold: "7.3k vendidos",
          categoryId: belezaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        },
        {
          name: "Escova de Limpeza Facial",
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 39,90",
          originalPrice: "R$ 89,90",
          rating: 4.6,
          sold: "5.6k vendidos",
          categoryId: belezaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        },
        {
          name: "Paleta de Maquiagem Pro",
          image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 69,90",
          originalPrice: "R$ 149,90",
          rating: 4.8,
          sold: "4.1k vendidos",
          categoryId: belezaCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 0
        }
      ];
      
      for (const product of belezaProducts) {
        await this.createProduct(product);
      }
    }

    if (promocoesCategory) {
      const promocoesProducts = [
        {
          name: "Combo Casa + Decoração",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 99,90",
          originalPrice: "R$ 299,90",
          rating: 4.9,
          sold: "12k vendidos",
          categoryId: promocoesCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 1
        },
        {
          name: "Pack Tecnologia 3x1",
          image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 199,90",
          originalPrice: "R$ 599,90",
          rating: 4.8,
          sold: "8.7k vendidos",
          categoryId: promocoesCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 1
        },
        {
          name: "Super Kit Beleza",
          image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          price: "R$ 149,90",
          originalPrice: "R$ 399,90",
          rating: 4.9,
          sold: "15k vendidos",
          categoryId: promocoesCategory.id,
          shopeeUrl: "https://shopee.com.br",
          isFlash: 1
        }
      ];
      
      for (const product of promocoesProducts) {
        await this.createProduct(product);
      }
    }
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

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.categoryId === categoryId);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
