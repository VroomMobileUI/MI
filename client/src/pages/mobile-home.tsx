import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, Review, BeforeAfter } from "@shared/schema";
import MobileProductCard from "@/components/mobile-product-card";
import MobileBeforeAfterSlider from "@/components/mobile-before-after-slider";
import MobileReviewCard from "@/components/mobile-review-card";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
  thumbnailImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "JAY's CINEKIT",
    subtitle: "DAVINCI POWERGRADE",
    description: "Professional color grading made effortless",
    buttonText: "AVAILABLE NOW",
    backgroundImage: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    thumbnailImage: "https://jayjankulovski.com/cdn/shop/files/preview_images/d2c7759f2e09424bba29fb0861c69cc5.thumbnail.0000000000_400x.jpg?v=1751944154"
  },
  {
    id: 2,
    title: "Live to explore",
    subtitle: "explore to live",
    description: "Transform your footage with cinematic LUTs",
    buttonText: "Explore V2 LUT PACK",
    backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    thumbnailImage: "https://jayjankulovski.com/cdn/shop/files/preview_images/091c0a7861ed4fdaa41ac25d53aa24ff.thumbnail.0000000000_400x.jpg?v=1741648302"
  },
  {
    id: 3,
    title: "CREATE WITH JAY",
    subtitle: "COMMUNITY",
    description: "Join thousands of creators elevating their content",
    buttonText: "LEARN MORE",
    backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    thumbnailImage: "https://jayjankulovski.com/cdn/shop/files/preview_images/29724c071f35451fba351a81c89b3f83.thumbnail.0000000000_400x.jpg?v=1749003348"
  }
];

export default function MobileHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount] = useState(0);

  // Refs for scroll animations
  const sliderRef = useRef<HTMLDivElement>(null);
  const latestProductsRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const isSliderInView = useInView(sliderRef, { once: true, margin: "-100px" });
  const isLatestProductsInView = useInView(latestProductsRef, { once: true, margin: "-50px" });

  // Data fetching
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const { data: featuredProducts, isLoading: featuredLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"]
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"]
  });

  const { data: beforeAfterImages, isLoading: beforeAfterLoading } = useQuery<BeforeAfter[]>({
    queryKey: ["/api/before-after"]
  });

  const latestProducts = featuredProducts?.slice(0, 2) || [];
  const digitalProducts = featuredProducts || [];
  const latestReviews = reviews?.slice(0, 6) || [];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Mobile Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            <button 
              className="md:hidden text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 bg-white z-40 top-14"
          >
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <a href="#" className="block text-lg font-medium text-black border-b border-gray-200 pb-4">HOME</a>
                <a href="#" className="block text-lg font-medium text-gray-600 border-b border-gray-200 pb-4">STORE</a>
                <a href="#" className="block text-lg font-medium text-gray-600 border-b border-gray-200 pb-4">COMMUNITY</a>
                <a href="#" className="block text-lg font-medium text-gray-600 border-b border-gray-200 pb-4">CONTACT</a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>🧍‍♂️</span>
                  <span>LOGIN</span>
                </div>
                
                <div className="mt-4 flex items-center space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-5 h-3" />
                  <span className="text-sm text-gray-600">INR ₹</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-14">
        <div className="hero-carousel relative w-full h-full">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${slide.backgroundImage})`,
                  filter: 'brightness(0.7)'
                }}
              />
              <div className="relative z-10 px-4 h-full flex flex-col justify-center text-center text-white">
                <motion.img 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  src={slide.thumbnailImage} 
                  alt={`${slide.title} Preview`} 
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-6"
                />
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-3xl font-bold mb-2"
                >
                  {slide.title}
                </motion.h2>
                {slide.subtitle && (
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-lg text-orange-400 mb-4"
                  >
                    {slide.subtitle}
                  </motion.h3>
                )}
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-gray-200 mb-8 px-4"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <Button 
                    className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-none font-semibold"
                  >
                    {slide.buttonText}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white opacity-100' 
                  : 'bg-white opacity-30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="space-y-6 mb-12">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              src="https://jayjankulovski.com/cdn/shop/files/Studio_s1000_film_burn_2.1.1.jpg?v=1741651968&width=2560" 
              alt="Professional Studio Setup" 
              className="rounded-lg shadow-lg w-full"
            />
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              src="https://jayjankulovski.com/cdn/shop/files/Dirtbike_boot_shot_1.1.1.jpg?v=1741651432&width=3840" 
              alt="Action Sports Photography" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-black">
              YOUR VISION. YOUR STORY. YOUR STYLE.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Elevate your videos with professional LUTs, Transitions and SFX. Whether you're filming on the road or in the studio, bring your vision to life— <span className="font-semibold">effortlessly</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Latest Products */}
      <section ref={latestProductsRef} className="py-16 px-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLatestProductsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Animated line */}
            <motion.div
              initial={{ width: 0, marginLeft: "50%" }}
              animate={isLatestProductsInView ? { width: "100%", marginLeft: "0%" } : { width: 0, marginLeft: "50%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-black mb-4"
            />
            <h2 className="text-2xl font-bold tracking-wider">LATEST PRODUCTS</h2>
          </motion.div>
          
          {productsLoading || featuredLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-80 rounded-lg bg-gray-200" />
              <Skeleton className="h-80 rounded-lg bg-gray-200" />
            </div>
          ) : (
            <div className="space-y-6">
              {latestProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLatestProductsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
                >
                  <MobileProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What's New Section */}
      <section ref={sliderRef} className="py-16 px-4">
        <div className="max-w-md mx-auto text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSliderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated line */}
            <motion.div
              initial={{ width: 0, marginLeft: "50%" }}
              animate={isSliderInView ? { width: "100%", marginLeft: "0%" } : { width: 0, marginLeft: "50%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-black mb-4"
            />
            <Button className="bg-black text-white px-6 py-2 rounded-none font-semibold mb-8">
              WHAT'S NEW?
            </Button>
          </motion.div>
          
          {beforeAfterLoading ? (
            <Skeleton className="h-64 rounded-lg bg-gray-200" />
          ) : beforeAfterImages && beforeAfterImages.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSliderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <MobileBeforeAfterSlider beforeAfter={beforeAfterImages[0]} />
            </motion.div>
          ) : (
            <div className="text-center text-gray-600">
              No before/after images available
            </div>
          )}
        </div>
      </section>

      {/* LUT Collection Showcase */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-md mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden"
          >
            <img 
              src="https://jayjankulovski.com/cdn/shop/files/See_all_the_looks_v2.jpg?v=1746066735&width=3840" 
              alt="See All V2 Looks" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6 w-full">
                <Button className="bg-white text-black w-full py-3 rounded-none font-semibold">
                  SEE ALL V2 LUTS
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden"
          >
            <img 
              src="https://jayjankulovski.com/cdn/shop/files/See_all_the_v1_Looks.jpg?v=1746067171&width=3840" 
              alt="See All V1 Looks" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6 w-full">
                <Button className="bg-white text-black w-full py-3 rounded-none font-semibold">
                  SEE ALL V1 LUTS
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Most Popular Digital Products */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-sm text-gray-600 mb-2">MOST POPULAR</p>
            <h2 className="text-2xl font-bold tracking-wider">DIGITAL PRODUCTS</h2>
          </motion.div>
          
          {productsLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {digitalProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MobileProductCard product={product} variant="grid" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-bold mb-2">What are my customers saying</h2>
            <div className="flex justify-center items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">⭐</span>
              ))}
            </div>
            <p className="text-sm text-gray-600">from {reviews?.length || 0} reviews</p>
          </motion.div>
          
          {reviewsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {latestReviews.slice(0, 3).map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MobileReviewCard review={review} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-4">NEWSLETTER</h2>
            <p className="text-gray-300 mb-6 text-sm">
              Stay up to date with new product releases, exclusive offers and more.
            </p>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="E-mail" 
                className="w-full p-3 bg-transparent border border-gray-600 rounded-none text-white placeholder-gray-400"
              />
              <Button className="w-full bg-white text-black py-3 rounded-none font-semibold">
                SUBSCRIBE
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-bold mb-4">PRODUCTS</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>JAY v1 LUT PACK</li>
                <li>JAY v2 LUT PACK</li>
                <li>JAY's CineKit (DaVinci Powergrade)</li>
                <li>OVERLAY TRANSITIONS + SFX PACK</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">LEGAL</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Privacy Policy</li>
                <li>Refund Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">CONTACT US</h3>
              <p className="text-gray-300 text-sm">Ask Question</p>
            </div>
            
            <div className="text-center pt-8 border-t border-gray-800">
              <p className="text-xs text-gray-400 mb-4">
                © 2025 - JAY JANKULOVSKI POWERED BY SHOPIFY
              </p>
              <div className="flex justify-center space-x-2">
                {/* Payment icons would go here */}
                <div className="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center">AE</div>
                <div className="w-8 h-5 bg-black border rounded text-xs flex items-center justify-center">AP</div>
                <div className="w-8 h-5 bg-green-600 rounded text-xs flex items-center justify-center">GP</div>
                <div className="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center">MC</div>
                <div className="w-8 h-5 bg-blue-800 rounded text-xs flex items-center justify-center">PP</div>
                <div className="w-8 h-5 bg-purple-600 rounded text-xs flex items-center justify-center">SP</div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}