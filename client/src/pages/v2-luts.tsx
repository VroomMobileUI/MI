import { useState } from "react";
import { motion } from "framer-motion";
import { X, ShoppingCart, Search, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import MobileProductCard from "@/components/mobile-product-card";

export default function V2Luts() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const v2Products = products?.filter(product => 
    product.name.toLowerCase().includes('v2') || product.name.toLowerCase().includes('jay v2')
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
                <div className="relative">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="m16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </div>
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
              JAY V2 LUT PACK
            </motion.h1>
            <p className="text-gray-600 text-xs">Enhanced with the latest feature upgrades</p>
          </div>
        </div>

        {/* SEE THE LOOKS Section */}
        <div className="bg-black text-white py-16 px-4">
          <div className="max-w-sm mx-auto text-center">
            <h2 className="text-sm font-normal mb-4 tracking-[0.15em] uppercase">SEE THE LOOKS</h2>
            <p className="text-gray-300 text-xs mb-8 leading-relaxed">
              Get a closer look at all 12 creative looks included in the V2 pack. (The % is the intensity of the LUT used for these specific clips)
            </p>
            
            {/* LUT Sliders */}
            <div className="space-y-8">
              {/* 1. ECHO */}
              <div>
                <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">1. ECHO</h3>
                <div className="relative w-full h-48 overflow-hidden cursor-ew-resize select-none">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af2176"
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      REC.709 + CORRECTION
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 50% 0 0)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      1. ECHO (80%)
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg left-1/2">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. HORIZON */}
              <div>
                <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">2. HORIZON</h3>
                <div className="relative w-full h-48 overflow-hidden cursor-ew-resize select-none">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      REC.709 + CORRECTION
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 50% 0 0)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      2. HORIZON (90%)
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg left-1/2">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. SUMMIT */}
              <div>
                <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">3. SUMMIT</h3>
                <div className="relative w-full h-48 overflow-hidden cursor-ew-resize select-none">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      REC.709 + CORRECTION
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 50% 0 0)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1547036967-23d11aacaee0"
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      3. SUMMIT (75%)
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg left-1/2">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. VOYAGE */}
              <div>
                <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">4. VOYAGE</h3>
                <div className="relative w-full h-48 overflow-hidden cursor-ew-resize select-none">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      REC.709 + CORRECTION
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 50% 0 0)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      4. VOYAGE (85%)
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg left-1/2">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. ENDLESS */}
              <div>
                <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">5. ENDLESS</h3>
                <div className="relative w-full h-48 overflow-hidden cursor-ew-resize select-none">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5"
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      REC.709 + CORRECTION
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 50% 0 0)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1477511801984-4ad318ed9846"
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      5. ENDLESS (100%)
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg left-1/2">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. SERENE */}
              <div>
                <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">6. SERENE</h3>
                <div className="relative w-full h-48 overflow-hidden cursor-ew-resize select-none">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      REC.709 + CORRECTION
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 50% 0 0)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af2176"
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
                      6. SERENE (70%)
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg left-1/2">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INSPIRED Section */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-sm mx-auto text-center">
            <h2 className="text-black text-sm font-normal mb-8 tracking-[0.15em] uppercase">INSPIRED?</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-64 rounded-lg bg-gray-200" />
                  <Skeleton className="h-64 rounded-lg bg-gray-200" />
                </>
              ) : (
                <>
                  {v2Products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <MobileProductCard product={product} variant="grid" />
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}