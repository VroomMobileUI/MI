import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import MobileProductCard from "@/components/mobile-product-card";

export default function Products() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Mobile Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            <button 
              className="md:hidden text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : (
                <div className="space-y-1">
                  <div className="w-5 h-0.5 bg-black"></div>
                  <div className="w-5 h-0.5 bg-black"></div>
                  <div className="w-5 h-0.5 bg-black"></div>
                </div>
              )}
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

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 top-14"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="bg-white w-80 h-full shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <a href="/" className="block text-lg font-medium text-black border-b border-gray-200 pb-4">HOME</a>
                  <a href="/products" className="block text-lg font-medium text-orange-600 border-b border-gray-200 pb-4">STORE</a>
                  <a href="#" className="block text-lg font-medium text-gray-600 border-b border-gray-200 pb-4">COMMUNITY</a>
                  <a href="#" className="block text-lg font-medium text-gray-600 border-b border-gray-200 pb-4">CONTACT</a>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>👤</span>
                    <span>LOGIN</span>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-2">
                    <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-5 h-3" />
                    <span className="text-sm text-gray-600">INR ₹</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </nav>

      <div className="pt-14">
        {/* Page Header */}
        <div className="px-4 py-8 bg-gray-50">
          <div className="max-w-md mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-normal tracking-[0.15em] uppercase mb-4"
            >
              DIGITAL PRODUCTS
            </motion.h1>
          </div>
        </div>



        {/* Products Grid */}
        <div className="px-4 py-8">
          <div className="max-w-md mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-lg bg-gray-200" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {products && products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <MobileProductCard product={product} variant="grid" />
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