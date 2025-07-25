import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products", error });
    }
  });

  // Get featured products
  app.get("/api/products/featured", async (_req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products", error });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product", error });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category", error });
    }
  });

  // Get all reviews
  app.get("/api/reviews", async (_req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews", error });
    }
  });

  // Get reviews for a specific product
  app.get("/api/reviews/product/:productId", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(req.params.productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product reviews", error });
    }
  });

  // Get before/after images
  app.get("/api/before-after", async (_req, res) => {
    try {
      const images = await storage.getBeforeAfterImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch before/after images", error });
    }
  });

  // Get before/after images for a specific product
  app.get("/api/before-after/product/:productId", async (req, res) => {
    try {
      const images = await storage.getProductBeforeAfter(req.params.productId);
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product before/after images", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
