import type { Product, Review, BeforeAfter } from "@shared/schema";

export const mockProducts: Product[] = [
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
  }
];

export const mockReviews: Review[] = [
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
  }
];

export const mockBeforeAfter: BeforeAfter[] = [
  {
    id: "1",
    productId: "2",
    beforeImageUrl: "https://jayjankulovski.com/cdn/shop/files/before_gt3_1.2.2.jpg?v=1741652634&width=3840",
    afterImageUrl: "https://jayjankulovski.com/cdn/shop/files/after_gt3_1.2.1.jpg?v=1741652635&width=3840",
    beforeLabel: "SLOG3",
    afterLabel: "LUT 03. - SERENE"
  }
];
