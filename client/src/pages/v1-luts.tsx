import { useState } from "react";
import { motion } from "framer-motion";
import { X, ShoppingCart, Search, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import MobileProductCard from "@/components/mobile-product-card";

export default function V1Luts() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const v1Products = products?.filter(product => 
    product.name.toLowerCase().includes('v1') || product.name.toLowerCase().includes('jay v1') || product.name.toLowerCase().includes('cinekit')
  ) || [];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Mobile Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            <button 
              onClick={() => window.history.back()}
              className="text-black"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex-1 text-center">
              <h1 className="text-sm font-normal tracking-[0.2em] uppercase">JAY JANKULOVSKI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-black">
                <Search size={20} />
              </button>
              <button 
                className="relative text-black"
                onClick={() => window.location.href = '/cart'}
              >
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
        {/* Page Header */}
        <div className="px-4 py-8 bg-gray-50">
          <div className="max-w-sm mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-normal tracking-[0.15em] uppercase mb-4"
            >
              JAY V1 LUT PACK
            </motion.h1>
            <p className="text-gray-600 text-xs">The original collection with classic cinematic looks</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-4 py-8">
          <div className="max-w-sm mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-lg bg-gray-200" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {v1Products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <MobileProductCard product={product} variant="grid" />
                  </motion.div>
                ))}
                
                {/* Add duplicate products to show more variety */}
                {v1Products.map((product, index) => (
                  <motion.div
                    key={`${product.id}-duplicate`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + v1Products.length) * 0.1 }}
                  >
                    <MobileProductCard product={{...product, id: `${product.id}-dup`, name: `${product.name} - Classic`}} variant="grid" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}