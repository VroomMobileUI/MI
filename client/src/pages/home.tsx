import Navigation from "@/components/navigation";
import HeroCarousel from "@/components/hero-carousel";
import ProductCard from "@/components/product-card";
import BeforeAfterSlider from "@/components/before-after-slider";
import ReviewCard from "@/components/review-card";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, Review, BeforeAfter } from "@shared/schema";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-[var(--cinema-black)] text-white overflow-x-hidden">
      <Navigation />
      
      <HeroCarousel />
      
      {/* Brand Statement */}
      <section className="py-24 bg-gradient-to-b from-[var(--cinema-black)] to-[var(--cinema-gray)]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <img 
              src="https://jayjankulovski.com/cdn/shop/files/Studio_s1000_film_burn_2.1.1.jpg?v=1741651968&width=2560" 
              alt="Professional Studio Setup" 
              className="rounded-2xl shadow-2xl"
            />
            <img 
              src="https://jayjankulovski.com/cdn/shop/files/Dirtbike_boot_shot_1.1.1.jpg?v=1741651432&width=3840" 
              alt="Action Sports Photography" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="animate-slide-up">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-white">Your Vision. Your Story. Your Style.</span>
            </h2>
            <p className="text-xl text-[var(--cinema-text)] max-w-4xl mx-auto leading-relaxed">
              Elevate your videos with professional LUTs, Transitions and SFX. Whether you're filming on the road or in the studio, bring your vision to life— <span className="text-[var(--cinema-accent)] font-semibold">effortlessly</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-24 bg-[var(--cinema-gray)]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">LATEST PRODUCTS</h2>
          
          {productsLoading || featuredLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Skeleton className="h-96 rounded-2xl bg-[var(--cinema-black)]" />
              <Skeleton className="h-96 rounded-2xl bg-[var(--cinema-black)]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="large" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Before/After Showcase */}
      <section className="py-24 bg-[var(--cinema-black)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">WHAT'S NEW?</h2>
            <a href="#" className="text-[var(--cinema-accent)] hover:text-orange-500 text-xl font-semibold">JAY v2 LUT PACK</a>
          </div>
          
          {beforeAfterLoading ? (
            <Skeleton className="h-96 max-w-4xl mx-auto rounded-2xl bg-[var(--cinema-gray)]" />
          ) : beforeAfterImages && beforeAfterImages.length > 0 ? (
            <BeforeAfterSlider beforeAfter={beforeAfterImages[0]} />
          ) : (
            <div className="text-center text-[var(--cinema-text)]">
              No before/after images available
            </div>
          )}
        </div>
      </section>

      {/* LUT Collection Showcase */}
      <section className="py-24 bg-[var(--cinema-gray)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src="https://jayjankulovski.com/cdn/shop/files/See_all_the_looks_v2.jpg?v=1746066735&width=3840" 
                alt="See All V2 Looks" 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">SEE ALL V2 LUTS</h3>
                  <p className="text-[var(--cinema-text)]">Discover the complete collection</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src="https://jayjankulovski.com/cdn/shop/files/See_all_the_v1_Looks.jpg?v=1746067171&width=3840" 
                alt="See All V1 Looks" 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">SEE ALL V1 LUTS</h3>
                  <p className="text-[var(--cinema-text)]">Explore the original series</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Products Grid */}
      <section className="py-24 bg-[var(--cinema-black)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold">DIGITAL PRODUCTS</h2>
            <span className="text-[var(--cinema-accent)] font-semibold">Most popular</span>
          </div>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl bg-[var(--cinema-gray)]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {digitalProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="small" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-[var(--cinema-gray)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What are my customers saying</h2>
            <a href="#" className="text-[var(--cinema-accent)] hover:text-orange-500">from {reviews?.length || 0} reviews</a>
          </div>
          
          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl bg-[var(--cinema-black)]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
