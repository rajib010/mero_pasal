import React from 'react';
import { XCircle, Home } from 'lucide-react';

export default function PaymentFailure() {
  const handleGoHome = () => {
    // In a real app, you would navigate to home
    console.log('Navigating to home...');
    // window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-pink-600 to-red-800 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
        <div className="mb-8">
          <XCircle className="w-24 h-24 text-red-500 mx-auto animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Failed!
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Your transaction could not be processed.
        </p>
        
        <button 
          onClick={handleGoHome}
          className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
        >
          <Home className="w-5 h-5" />
          Go to Home
        </button>
      </div>
    </div>
  );
}