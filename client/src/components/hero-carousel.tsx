import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-carousel relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center hero-gradient"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl animate-fade-in">
                <img 
                  src={slide.thumbnailImage} 
                  alt={`${slide.title} Preview`} 
                  className="w-32 h-32 object-cover rounded-xl mb-6 animate-float"
                />
                <h2 className="text-6xl font-bold mb-4">
                  <span className="text-white">{slide.title}</span>
                  {slide.subtitle && (
                    <>
                      <span className="text-[var(--cinema-accent)]"> | </span>
                      <span className="text-[var(--cinema-accent)]">{slide.subtitle}</span>
                    </>
                  )}
                </h2>
                <p className="text-xl text-[var(--cinema-text)] mb-8">{slide.description}</p>
                <Button 
                  className="bg-[var(--cinema-accent)] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-[var(--cinema-accent)] opacity-100' 
                : 'bg-white opacity-30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
