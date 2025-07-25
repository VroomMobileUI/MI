import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  edition?: string;
  camera?: string;
}

export default function Checkout() {
  const [step, setStep] = useState(1); // 1: Information, 2: Payment, 3: Confirmation
  const [isProcessing, setIsProcessing] = useState(false);
  
  const orderItems: OrderItem[] = [
    {
      id: "1",
      name: "JAY V1 LUT PACK",
      price: "2700.00",
      quantity: 1,
      edition: "Standard",
      camera: "Pro Camera + Monitor"
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => 
    sum + (parseFloat(item.price) * item.quantity), 0
  );
  
  const shipping = 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinueToPayment = () => {
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep(3);
    setIsProcessing(false);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase. You'll receive an email with your download links shortly.</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-black text-white px-6 py-3 rounded-none"
          >
            Continue Shopping
          </Button>
        </motion.div>
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
              onClick={() => step === 1 ? window.history.back() : setStep(1)}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold">
              {step === 1 ? "Checkout" : "Payment"}
            </h1>
          </div>
        </div>
      </nav>

      <div className="flex flex-col min-h-screen">
        {/* Progress Steps */}
        <div className="px-4 py-4 bg-gray-50">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${step >= 1 ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-black text-white' : 'bg-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 text-sm">Information</span>
              </div>
              
              <div className={`flex-1 h-px mx-4 ${step >= 2 ? 'bg-black' : 'bg-gray-300'}`}></div>
              
              <div className={`flex items-center ${step >= 2 ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-black text-white' : 'bg-gray-300'}`}>
                  2
                </div>
                <span className="ml-2 text-sm">Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-6">
          <div className="max-w-md mx-auto">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Contact Information */}
                <div>
                  <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Street address"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Payment Method */}
                <div>
                  <h2 className="text-lg font-bold mb-4 flex items-center">
                    <Lock size={16} className="mr-2" />
                    Payment Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative mt-1">
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="pl-10"
                        />
                        <CreditCard size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Same as Shipping */}
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sameBilling" className="rounded" defaultChecked />
                  <label htmlFor="sameBilling" className="text-sm text-gray-600">
                    Billing address is the same as shipping address
                  </label>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Order Summary & Actions */}
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-6">
          <div className="max-w-md mx-auto">
            {/* Order Items */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start py-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    {item.edition && (
                      <p className="text-xs text-gray-600">Edition: {item.edition}</p>
                    )}
                    {item.camera && (
                      <p className="text-xs text-gray-600">Camera: {item.camera}</p>
                    )}
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-sm">RS. {item.price}</p>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>RS. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (GST 18%)</span>
                <span>RS. {tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>RS. {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {step === 1 ? (
              <Button 
                onClick={handleContinueToPayment}
                className="w-full bg-black text-white py-4 rounded-none font-semibold"
              >
                Continue to Payment
              </Button>
            ) : (
              <Button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-black text-white py-4 rounded-none font-semibold"
              >
                {isProcessing ? "Processing..." : `Pay RS. ${total.toFixed(2)}`}
              </Button>
            )}
            
            <p className="text-xs text-gray-500 text-center mt-3">
              <Lock size={12} className="inline mr-1" />
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}