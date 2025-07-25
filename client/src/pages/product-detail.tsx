import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart, Search, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoute } from "wouter";
import type { Product, Review } from "@shared/schema";
import MobileReviewCard from "@/components/mobile-review-card";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState("Standard");
  const [selectedCamera, setSelectedCamera] = useState("Pro Camera + Monitor");
  const [isAdding, setIsAdding] = useState(false);

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: ["/api/products", params?.id],
    enabled: !!params?.id
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews/product", params?.id],
    enabled: !!params?.id
  });

  const productImages = [
    product?.imageUrl,
    product?.hoverImageUrl,
    product?.imageUrl,
    product?.hoverImageUrl
  ].filter(Boolean);

  const editions = ["Standard", "Ultimate"];
  const cameras = ["Pro Camera + Monitor", "iPhone LOG", "Action Camera", "Drone"];

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAdding(false);
  };

  const formatPrice = (price: string) => {
    return `RS. ${(parseFloat(price) * 70).toFixed(2)}`;
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-14 px-4">
          <Skeleton className="h-80 w-full rounded-lg bg-gray-200 mb-4" />
          <Skeleton className="h-8 w-3/4 bg-gray-200 mb-2" />
          <Skeleton className="h-6 w-1/2 bg-gray-200 mb-4" />
          <Skeleton className="h-12 w-full bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Mobile Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            <button 
              onClick={() => window.history.back()}
              className="text-black"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold tracking-wider">JAY JANKULOVSKI</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="text-black">
                <Search size={20} />
              </button>
              <button className="relative text-black">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-14">
        {/* Product Images */}
        <div className="px-4 py-6">
          <div className="max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-4"
            >
              <img 
                src={productImages[selectedImage] || product.imageUrl} 
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
              {product.isOnSale && (
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  NEW
                </div>
              )}
            </motion.div>

            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex justify-center space-x-2 mb-6">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full ${
                      selectedImage === index ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 pb-6">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl font-bold text-orange-600">
                  {product.salePrice ? formatPrice(product.salePrice) : formatPrice(product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {reviews && reviews.length > 0 && (
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{reviews.length} reviews</span>
                </div>
              )}

              {/* Edition Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Edition:</h3>
                <div className="flex space-x-2">
                  {editions.map((edition) => (
                    <button
                      key={edition}
                      onClick={() => setSelectedEdition(edition)}
                      className={`px-4 py-2 border rounded ${
                        selectedEdition === edition
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 bg-white text-black hover:border-gray-400'
                      }`}
                    >
                      {edition}
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Camera Type:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {cameras.map((camera) => (
                    <button
                      key={camera}
                      onClick={() => setSelectedCamera(camera)}
                      className={`px-3 py-2 border rounded text-sm ${
                        selectedCamera === camera
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 bg-white text-black hover:border-gray-400'
                      }`}
                    >
                      {camera}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compare Editions */}
              <div className="mb-6">
                <button className="text-sm text-blue-600 underline">
                  COMPARE EDITIONS
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  The original V1 LUT Pack has been <span className="font-semibold">enhanced with the latest feature upgrades</span> from the new V2 LUT Pack.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  You can now select which 'edition' of the V1 pack suits you best.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Each edition containing <span className="font-semibold">'Combination LUTs'</span> designed for the specific camera + LOG profiles.
                </p>
              </div>

              {/* Add to Cart */}
              <Button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-black text-white hover:bg-gray-800 py-4 rounded-none font-semibold text-lg"
              >
                {isAdding ? "Adding to Cart..." : "Add to Cart"}
              </Button>

              {/* Video Tutorials Section */}
              <div className="mt-8">
                <button className="w-full flex justify-between items-center py-4 border-t border-gray-200">
                  <span className="font-semibold">VIDEO TUTORIALS</span>
                  <span className="text-2xl">+</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews && reviews.length > 0 && (
          <div className="px-4 py-8 bg-gray-50">
            <div className="max-w-md mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-bold mb-6 text-center"
              >
                Customer Reviews
              </motion.h2>
              <div className="space-y-4">
                {reviews.slice(0, 3).map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MobileReviewCard review={review} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}