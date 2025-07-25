import { type Product, type InsertProduct, type Review, type InsertReview, type BeforeAfter, type InsertBeforeAfter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Reviews
  getReviews(): Promise<Review[]>;
  getProductReviews(productId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Before/After Images
  getBeforeAfterImages(): Promise<BeforeAfter[]>;
  getProductBeforeAfter(productId: string): Promise<BeforeAfter[]>;
  createBeforeAfter(beforeAfter: InsertBeforeAfter): Promise<BeforeAfter>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private reviews: Map<string, Review>;
  private beforeAfterImages: Map<string, BeforeAfter>;

  constructor() {
    this.products = new Map();
    this.reviews = new Map();
    this.beforeAfterImages = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed products
    const products: Product[] = [
      {
        id: "1",
        name: "JAY's CineKit (DaVinci Powergrade)",
        description: "Professional color grading made effortless with comprehensive DaVinci Resolve powergrade templates.",
        price: "41.00",
        salePrice: "31.00",
        category: "powergrade",
        imageUrl: "https://jayjankulovski.com/cdn/shop/files/TheCinekitNEW.jpg?v=1752230972&width=2048",
        hoverImageUrl: null,
        isOnSale: true,
        isFeatured: true,
        tags: ["davinci", "powergrade", "color-grading"]
      },
      {
        id: "2",
        name: "JAY v2 LUT PACK",
        description: "Cinematic LUTs with warmer, nostalgic tones reminiscent of classic film aesthetics.",
        price: "41.00",
        salePrice: null,
        category: "luts",
        imageUrl: "https://jayjankulovski.com/cdn/shop/files/JAY_v2_LUT_PACK.jpg?v=1741153201&width=2048",
        hoverImageUrl: "https://jayjankulovski.com/cdn/shop/files/BA_1.jpg?v=1741640075&width=2048",
        isOnSale: false,
        isFeatured: true,
        tags: ["luts", "cinematic", "warm-tones"]
      },
      {
        id: "3",
        name: "JAY v1 LUT PACK",
        description: "Original LUT collection with cooler tones for professional video editing.",
        price: "41.00",
        salePrice: "31.00",
        category: "luts",
        imageUrl: "https://jayjankulovski.com/cdn/shop/files/JAY_v1_LUT_PACK_2.o.jpg?v=1743772694&width=2048",
        hoverImageUrl: "https://jayjankulovski.com/cdn/shop/files/BA_1_v1.jpg?v=1743772694&width=2048",
        isOnSale: true,
        isFeatured: true,
        tags: ["luts", "cinematic", "cool-tones"]
      },
      {
        id: "4",
        name: "OVERLAY TRANSITIONS + SFX PACK",
        description: "Professional film burn overlays and transition effects for dynamic video editing.",
        price: "41.00",
        salePrice: "31.00",
        category: "transitions",
        imageUrl: "https://jayjankulovski.com/cdn/shop/files/OVERLAYS_SFX.jpg?v=1741147838&width=2048",
        hoverImageUrl: "https://jayjankulovski.com/cdn/shop/files/Burn_GIF_1.gif?v=1741183584&width=500",
        isOnSale: true,
        isFeatured: true,
        tags: ["transitions", "overlays", "sfx", "film-burn"]
      }
    ];

    products.forEach(product => this.products.set(product.id, product));

    // Seed reviews
    const reviews: Review[] = [
      {
        id: "1",
        productId: "2",
        customerName: "Anonymous",
        rating: 5,
        title: "best",
        content: "best luts",
        date: new Date("2025-07-21")
      },
      {
        id: "2",
        productId: "1",
        customerName: "Maverick",
        rating: 5,
        title: "The CineKit has really upped my color grading skills",
        content: "The CineKit has really upped my color grading skills. It makes my footages stand out with the film look. Also, Jay really put time and effort in teaching me how to color grade like him. Truly worth every penny!!",
        date: new Date("2025-07-21")
      },
      {
        id: "3",
        productId: "2",
        customerName: "Khai Tran",
        rating: 5,
        title: "Legendary Quality, Just Like the V1 Pack",
        content: "While V1 pack leans toward cooler tones, V2 pack brings a warmer, more nostalgic feel — reminiscent of classic Fujifilm aesthetics. Like the original, this pack is built with simplicity and professionalism at its core.",
        date: new Date("2025-04-24")
      },
      {
        id: "4",
        productId: "3",
        customerName: "Travis R.",
        rating: 5,
        title: "🔥🔥🔥",
        content: "Not only did the LUT's give my videos an upgrade. The additional videos helped me with getting my Ace Pro 2 dialed in.",
        date: new Date("2025-03-03")
      },
      {
        id: "5",
        productId: "4",
        customerName: "Casey Turner",
        rating: 5,
        title: "10/10 Pack",
        content: "This pack is insane. My editing and transition game has gone from 10–99 with this pack alone! Cannot recommend more!",
        date: new Date("2024-10-01")
      },
      {
        id: "6",
        productId: "4",
        customerName: "C.T.",
        rating: 5,
        title: "Insane sfx + transition pack",
        content: "After purchasing both the Jay v1 LUT pack and the sfx pack i cannot wait for more to come. Super high quality and 10/10 tutorials on how to use them.",
        date: new Date("2024-09-24")
      }
    ];

    reviews.forEach(review => this.reviews.set(review.id, review));

    // Seed before/after images
    const beforeAfterImages: BeforeAfter[] = [
      {
        id: "1",
        productId: "2",
        beforeImageUrl: "https://jayjankulovski.com/cdn/shop/files/before_gt3_1.2.2.jpg?v=1741652634&width=3840",
        afterImageUrl: "https://jayjankulovski.com/cdn/shop/files/after_gt3_1.2.1.jpg?v=1741652635&width=3840",
        beforeLabel: "SLOG3",
        afterLabel: "LUT 03. - SERENE"
      }
    ];

    beforeAfterImages.forEach(image => this.beforeAfterImages.set(image.id, image));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isFeatured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort((a, b) => 
      new Date(b.date!).getTime() - new Date(a.date!).getTime()
    );
  }

  async getProductReviews(productId: string): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.productId === productId)
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { ...insertReview, id, date: new Date() };
    this.reviews.set(id, review);
    return review;
  }

  async getBeforeAfterImages(): Promise<BeforeAfter[]> {
    return Array.from(this.beforeAfterImages.values());
  }

  async getProductBeforeAfter(productId: string): Promise<BeforeAfter[]> {
    return Array.from(this.beforeAfterImages.values())
      .filter(image => image.productId === productId);
  }

  async createBeforeAfter(insertBeforeAfter: InsertBeforeAfter): Promise<BeforeAfter> {
    const id = randomUUID();
    const beforeAfter: BeforeAfter = { ...insertBeforeAfter, id };
    this.beforeAfterImages.set(id, beforeAfter);
    return beforeAfter;
  }
}

export const storage = new MemStorage();
