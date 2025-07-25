import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Product, Review } from "@shared/schema";
import MobileBeforeAfterSlider from "@/components/mobile-before-after-slider";

export default function MobileHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews"]
  });

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Mobile Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            <button 
              className="text-black"
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
              <div className="p-6 space-y-0">
                <div className="space-y-0">
                  <a href="/" className="block text-sm font-normal text-black py-6 border-b border-gray-200 uppercase tracking-[0.1em]">HOME</a>
                  <a href="/products" className="block text-sm font-normal text-black py-6 border-b border-gray-200 uppercase tracking-[0.1em]">STORE</a>
                  <a href="#" className="block text-sm font-normal text-black py-6 border-b border-gray-200 uppercase tracking-[0.1em]">COMMUNITY</a>
                  <a href="#" className="block text-sm font-normal text-black py-6 border-b border-gray-200 uppercase tracking-[0.1em]">CONTACT</a>
                </div>
                
                <div className="mt-12">
                  <div className="flex items-center space-x-2 text-black mb-6">
                    <span>👤</span>
                    <span className="text-sm uppercase tracking-[0.1em]">LOGIN</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-5 h-3" />
                    <span className="text-sm text-black font-medium">INR ₹</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </nav>

      <div className="pt-14">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-sm mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-white text-sm font-normal mb-2 tracking-[0.2em] uppercase">JAY JANKULOVSKI</h1>
              <p className="text-white text-xs mb-8 tracking-[0.15em] uppercase font-light">CREATE WITH JAY COMMUNITY</p>
              <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 text-xs font-normal tracking-[0.1em] uppercase border-0 rounded-none">
                LEARN MORE
              </Button>
            </motion.div>
          </div>

          {/* Carousel dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-sm mx-auto">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                alt="Vision" 
                className="w-full h-40 object-cover mb-6"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-black text-sm font-normal mb-6 tracking-[0.15em] uppercase">
                YOUR VISION. YOUR STORY. YOUR STYLE.
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Elevate your videos with professional LUTs, Transitions and SFX. Whether you're filming on the road or in the studio, bring your vision to life — effortlessly.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Latest Products Section */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-sm mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-black text-sm font-normal mb-12 tracking-[0.15em] uppercase"
            >
              LATEST PRODUCTS
            </motion.h2>

            {products && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {products.slice(0, 2).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-none overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    <div className="relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      {product.isOnSale && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 text-xs font-medium uppercase">
                          NEW
                        </div>
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="absolute bottom-3 right-3 bg-white rounded-none p-2 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <span className="text-black text-lg">+</span>
                      </button>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-black text-xs font-normal mb-2 tracking-[0.1em] uppercase">{product.name}</h3>
                      <div className="space-y-1">
                        <div className="text-black text-sm font-medium">
                          RS. {(parseFloat(product.salePrice || product.price) * 70).toFixed(2)}
                        </div>
                        {product.salePrice && (
                          <div className="text-gray-400 text-xs line-through">
                            RS. {(parseFloat(product.price) * 70).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center">
              <Button 
                onClick={() => window.location.href = '/products'}
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-xs font-normal tracking-[0.1em] uppercase rounded-none"
              >
                WHAT'S NEW?
              </Button>
            </div>
          </div>
        </div>

        {/* Before/After Section */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-sm mx-auto">
            <MobileBeforeAfterSlider 
              images={[
                {
                  id: "1",
                  beforeImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
                  afterImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
                  beforeLabel: "SLOG3",
                  afterLabel: "LUT 02 - SERENE"
                },
                {
                  id: "2", 
                  beforeImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
                  afterImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
                  beforeLabel: "RAW FOOTAGE",
                  afterLabel: "JAY V2 LUT PACK"
                },
                {
                  id: "3",
                  beforeImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29", 
                  afterImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
                  beforeLabel: "FLAT LOG",
                  afterLabel: "CINEMATIC GRADE"
                }
              ]}
            />

            <div className="space-y-4 mt-8">
              <div className="bg-black text-white py-12 px-4 text-center">
                <Button 
                  onClick={() => window.location.href = '/v2-luts'}
                  className="bg-white text-black hover:bg-gray-100 px-6 py-2 text-xs font-normal tracking-[0.1em] uppercase rounded-none"
                >
                  SEE ALL V2 LUTS
                </Button>
              </div>

              <div className="bg-black text-white py-12 px-4 text-center">
                <Button 
                  onClick={() => window.location.href = '/v1-luts'}
                  className="bg-white text-black hover:bg-gray-100 px-6 py-2 text-xs font-normal tracking-[0.1em] uppercase rounded-none"
                >
                  SEE ALL V1 LUTS
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Most Popular Section */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-sm mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-black text-xs font-normal mb-2 tracking-[0.1em] uppercase">MOST POPULAR</h2>
              <h3 className="text-black text-sm font-normal tracking-[0.15em] uppercase">DIGITAL PRODUCTS</h3>
            </motion.div>

            {products && (
              <div className="grid grid-cols-2 gap-4">
                {products.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-none overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    <div className="relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="absolute bottom-3 right-3 bg-white rounded-none p-2 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <span className="text-black text-lg">+</span>
                      </button>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-black text-xs font-normal mb-2 tracking-[0.1em] uppercase">{product.name}</h3>
                      <div className="space-y-1">
                        <div className="text-red-600 text-sm font-medium">
                          FROM RS. {(parseFloat(product.salePrice || product.price) * 70).toFixed(2)}
                        </div>
                        {product.salePrice && (
                          <div className="text-gray-400 text-xs line-through">
                            RS. {(parseFloat(product.price) * 70).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-sm mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-black text-sm font-normal mb-4 tracking-[0.15em] uppercase">
                What are my customers saying
              </h2>
              <div className="flex justify-center items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">from 71 reviews</p>
            </motion.div>

            {reviews && reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 text-left"
              >
                <div className="flex justify-center items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <span className="text-orange-500 text-lg">🔥</span>
                  <span className="text-orange-500 text-lg">🔥</span>
                  <span className="text-orange-500 text-lg">🔥</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {reviews[0].comment}
                </p>
                <p className="text-gray-600 text-xs font-medium">
                  {reviews[0].customerName}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Newsletter Footer */}
        <div className="bg-black text-white py-16 px-4">
          <div className="max-w-sm mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">NEWSLETTER</h2>
              <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                Stay up to date with new product releases, exclusive offers and more.
              </p>
              
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="E-mail"
                  className="w-full bg-transparent border border-white/30 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white"
                />
                <Button className="w-full bg-white text-black hover:bg-gray-100 py-3 text-xs font-normal tracking-[0.1em] uppercase rounded-none">
                  SUBSCRIBE
                </Button>
              </div>

              <div className="mt-16 space-y-8 text-left">
                <div>
                  <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">PRODUCTS</h3>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>JAY v1 LUT PACK</div>
                    <div>JAY v2 LUT PACK</div>
                    <div>JAY's CineKit (DaVinci Powergrade)</div>
                    <div>OVERLAY TRANSITIONS + SFX PACK</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">LEGAL</h3>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>Privacy Policy</div>
                    <div>Refund Policy</div>
                    <div>Terms of Service</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-xs font-normal mb-4 tracking-[0.1em] uppercase">CONTACT US</h3>
                  <div className="text-gray-300 text-sm">
                    Ask Question
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/20 text-center">
                <p className="text-gray-400 text-xs">
                  © 2025 - JAY JANKULOVSKI POWERED BY SHOPIFY
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}