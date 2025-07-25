import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  variant: "small" | "large";
}

export default function ProductCard({ product, variant }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAdding(false);
  };

  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  if (variant === "large") {
    return (
      <div className="bg-[var(--cinema-black)] rounded-2xl overflow-hidden card-hover">
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
          {product.isOnSale && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
              SALE
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-[var(--cinema-text)] mb-4">{product.description}</p>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold text-[var(--cinema-accent)]">
              {product.salePrice ? formatPrice(product.salePrice) : formatPrice(product.price)}
            </span>
            {product.salePrice && (
              <span className="text-lg text-[var(--cinema-text)] line-through">
                {formatPrice(product.price)}
              </span>
            )}
            {product.isOnSale && (
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">SALE</span>
            )}
          </div>
          <Button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-[var(--cinema-accent)] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-[var(--cinema-gray)] rounded-2xl overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={`w-full h-48 object-cover transition-opacity ${
            isHovered && product.hoverImageUrl ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {product.hoverImageUrl && (
          <img 
            src={product.hoverImageUrl} 
            alt={`${product.name} Hover`} 
            className={`absolute inset-0 w-full h-48 object-cover transition-opacity ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {product.isOnSale && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
            SALE
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-2">{product.name}</h3>
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-[var(--cinema-accent)]">
            {product.salePrice ? `From ${formatPrice(product.salePrice)}` : `From ${formatPrice(product.price)}`}
          </span>
          {product.salePrice && (
            <span className="text-sm text-[var(--cinema-text)] line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <Button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-[var(--cinema-accent)] hover:bg-orange-600 text-white py-2 rounded font-semibold transition-colors text-sm"
        >
          {isAdding ? "Adding..." : product.salePrice ? "Choose Options" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
