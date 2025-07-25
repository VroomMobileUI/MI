import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  edition?: string;
  camera?: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "JAY V1 LUT PACK",
      price: "2700.00",
      image: "https://jayjankulovski.com/cdn/shop/files/JAY_v1_LUT_PACK_2.o.jpg?v=1743772694&width=2048",
      quantity: 1,
      edition: "Standard",
      camera: "Pro Camera + Monitor"
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => 
    sum + (parseFloat(item.price) * item.quantity), 0
  );

  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black">
        {/* Header */}
        <nav className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()}
                className="mr-4"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-lg font-bold">Cart</h1>
            </div>
          </div>
        </nav>

        {/* Empty Cart */}
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <Button 
              onClick={() => window.location.href = '/products'}
              className="bg-black text-white px-6 py-3 rounded-none"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => window.history.back()}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold">Cart ({cartItems.length})</h1>
          </div>
        </div>
      </nav>

      <div className="flex flex-col min-h-screen">
        {/* Cart Items */}
        <div className="flex-1 px-4 py-6">
          <div className="max-w-md mx-auto space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                    
                    {item.edition && (
                      <p className="text-xs text-gray-600 mb-1">Edition: {item.edition}</p>
                    )}
                    
                    {item.camera && (
                      <p className="text-xs text-gray-600 mb-2">Camera: {item.camera}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-600">RS. {item.price}</span>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>
                        
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-6">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">RS. {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">RS. {total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => window.location.href = '/checkout'}
                className="w-full bg-black text-white py-4 rounded-none font-semibold text-lg"
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/products'}
                variant="outline"
                className="w-full border-black text-black py-3 rounded-none"
              >
                Continue Shopping
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}