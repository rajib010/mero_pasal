import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

export default function PaymentSuccess() {
  const handleGoHome = () => {
  
    window.location.href = '/shop/home';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto animate-bounce" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Your transaction has been completed successfully.
        </p>
        
        <button 
          onClick={handleGoHome}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
        >
          <Home className="w-5 h-5" />
          Go to Home
        </button>
      </div>
    </div>
  );
}