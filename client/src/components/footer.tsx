import { Youtube, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--cinema-black)] py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">JAY JANKULOVSKI</h3>
            <p className="text-[var(--cinema-text)] mb-6">
              Professional video editing tools and LUTs for creators who demand excellence. 
              Transform your footage with cinematic precision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[var(--cinema-text)] hover:text-[var(--cinema-accent)] transition-colors">
                <Youtube size={24} />
              </a>
              <a href="#" className="text-[var(--cinema-text)] hover:text-[var(--cinema-accent)] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-[var(--cinema-text)] hover:text-[var(--cinema-accent)] transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-[var(--cinema-text)]">
              <li><a href="#" className="hover:text-white transition-colors">LUT Packs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CineKit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transitions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SFX Pack</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-[var(--cinema-text)]">
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-[var(--cinema-text)]">
          <p>&copy; 2025 Jay Jankulovski. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
