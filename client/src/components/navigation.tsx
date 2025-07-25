import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <nav className="fixed top-0 w-full bg-[var(--cinema-black)]/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">JAY JANKULOVSKI</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-white hover:text-[var(--cinema-accent)] transition-colors">Products</a>
              <a href="#" className="text-[var(--cinema-text)] hover:text-white transition-colors">LUTs</a>
              <a href="#" className="text-[var(--cinema-text)] hover:text-white transition-colors">Transitions</a>
              <a href="#" className="text-[var(--cinema-text)] hover:text-white transition-colors">Community</a>
              <a href="#" className="text-[var(--cinema-text)] hover:text-white transition-colors">Reviews</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-[var(--cinema-text)] hover:text-white transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--cinema-accent)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-[var(--cinema-text)] hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[var(--cinema-black)]">
            <a href="#" className="block px-3 py-2 text-white hover:text-[var(--cinema-accent)] transition-colors">Products</a>
            <a href="#" className="block px-3 py-2 text-[var(--cinema-text)] hover:text-white transition-colors">LUTs</a>
            <a href="#" className="block px-3 py-2 text-[var(--cinema-text)] hover:text-white transition-colors">Transitions</a>
            <a href="#" className="block px-3 py-2 text-[var(--cinema-text)] hover:text-white transition-colors">Community</a>
            <a href="#" className="block px-3 py-2 text-[var(--cinema-text)] hover:text-white transition-colors">Reviews</a>
          </div>
        </div>
      )}
    </nav>
  );
}
