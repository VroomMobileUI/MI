import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Product } from "@shared/schema";

interface MobileProductCardProps {
  product: Product;
  variant?: "full" | "grid";
}

export default function MobileProductCard({ product, variant = "full" }: MobileProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAdding(false);
  };

  const formatPrice = (price: string) => {
    return `RS. ${(parseFloat(price) * 70).toFixed(2)}`; // Convert to INR roughly
  };

  if (variant === "grid") {
    return (
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => window.location.href = `/product/${product.id}`}
      >
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-32 object-cover"
          />
          {product.isOnSale && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              NEW
            </div>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={isAdding}
            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm mb-1 leading-tight">{product.name}</h3>
          <div className="space-y-1">
            <div className="text-orange-600 font-bold text-sm">
              {product.salePrice ? formatPrice(product.salePrice) : formatPrice(product.price)}
            </div>
            {product.salePrice && (
              <div className="text-xs text-gray-500 line-through">
                {formatPrice(product.price)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-pointer"
      onClick={() => window.location.href = `/product/${product.id}`}
    >
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        {product.isOnSale && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
            NEW
          </div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={isAdding}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus size={18} className="text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-orange-600 font-bold text-lg">
            {product.salePrice ? formatPrice(product.salePrice) : formatPrice(product.price)}
          </span>
          {product.salePrice && (
            <span className="text-gray-500 line-through text-sm">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <Button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-none font-semibold"
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
}