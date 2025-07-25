import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface BeforeAfterImage {
  id: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

interface MobileBeforeAfterSliderProps {
  images: BeforeAfterImage[];
}

export default function MobileBeforeAfterSlider({ images }: MobileBeforeAfterSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentSlide];

  return (
    <div className="relative">
      {/* Before/After Comparison */}
      <div 
        ref={containerRef}
        className="relative w-full h-64 overflow-hidden cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <img 
            src={currentImage.beforeImage} 
            alt="Before"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
            {currentImage.beforeLabel}
          </div>
        </div>

        {/* After Image */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={currentImage.afterImage} 
            alt="After"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-normal tracking-[0.1em] uppercase">
            {currentImage.afterLabel}
          </div>
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={prevSlide}
            className="bg-black text-white px-4 py-2 text-xs font-normal tracking-[0.1em] uppercase"
          >
            Previous
          </button>
          
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="bg-black text-white px-4 py-2 text-xs font-normal tracking-[0.1em] uppercase"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}