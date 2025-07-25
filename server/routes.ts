import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get category by slug
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Get products by category
  app.get("/api/categories/:slug/products", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const products = await storage.getProductsByCategory(category.id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get all products (for admin)
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Create new product
  app.post("/api/products", async (req, res) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", (req: any, res) => {
    try {
      const { password } = req.body;
      
      // Senha simples - você pode alterar aqui
      const ADMIN_PASSWORD = "Maduh5082410381";
      
      if (password === ADMIN_PASSWORD) {
        // Salvar na sessão HTTP
        req.session.isAdmin = true;
        req.session.loginTime = new Date();
        
        res.json({ success: true });
      } else {
        res.status(401).json({ message: "Senha incorreta" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor" });
    }
  });

  // Verificar se está autenticado
  app.get("/api/admin/check", (req: any, res) => {
    try {
      if (!req.session.isAdmin) {
        return res.status(401).json({ message: "Não autenticado" });
      }
      
      // Verificar se a sessão não expirou (24 horas)
      const loginTime = new Date(req.session.loginTime);
      const now = new Date();
      const diffHours = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
      
      if (diffHours > 24) {
        req.session.isAdmin = false;
        return res.status(401).json({ message: "Sessão expirada" });
      }
      
      res.json({ authenticated: true });
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor" });
    }
  });

  // Logout admin
  app.post("/api/admin/logout", (req: any, res) => {
    try {
      req.session.isAdmin = false;
      req.session.loginTime = null;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
