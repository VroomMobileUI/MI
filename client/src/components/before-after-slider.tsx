import { useState, useEffect, useRef } from "react";
import { CornerLeftUp } from "lucide-react";
import type { BeforeAfter } from "@shared/schema";

interface BeforeAfterSliderProps {
  beforeAfter: BeforeAfter;
}

export default function BeforeAfterSlider({ beforeAfter }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e: MouseEvent | React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSliderPosition(prev => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setSliderPosition(prev => Math.min(100, prev + 5));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div 
        ref={containerRef}
        className="before-after-container relative rounded-2xl overflow-hidden h-96 cursor-ew-resize"
        onMouseDown={handleMouseDown}
      >
        {/* Before Image */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={beforeAfter.beforeImageUrl} 
            alt="Before" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded">
            <span className="text-white font-semibold">{beforeAfter.beforeLabel}</span>
          </div>
        </div>

        {/* After Image */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img 
            src={beforeAfter.afterImageUrl} 
            alt="After" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-[var(--cinema-accent)]/90 px-3 py-1 rounded">
            <span className="text-white font-semibold">{beforeAfter.afterLabel}</span>
          </div>
        </div>

        {/* Slider */}
        <div 
          className="before-after-slider"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="before-after-handle">
            <CornerLeftUp size={12} />
          </div>
        </div>
      </div>
      
      <p className="text-center text-[var(--cinema-text)] mt-4">
        Use the left and right arrow keys to navigate between before and after photos.
      </p>
    </div>
  );
}
