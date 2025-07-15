import React, { useState } from 'react';
import img from '@/assets/account.jpg';
import Address from '@/components/shopping-view/address';
import { useSelector } from 'react-redux';
import UserCartContents from '@/components/shopping-view/cart-content';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Validation function
const validateCheckoutData = (cartItems, user, addressInfo, totalAmount) => {
  const errors = [];

  // Validate cart items
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    errors.push('Cart is empty');
  } else {
    cartItems.forEach((item, index) => {
      if (!item.productId) errors.push(`Item ${index + 1}: Product ID is required`);
      if (!item.title) errors.push(`Item ${index + 1}: Title is required`);
      if (!item.price || isNaN(item.price) || item.price <= 0) {
        errors.push(`Item ${index + 1}: Valid price is required`);
      }
      if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Valid quantity is required`);
      }
    });
  }

  // Validate user
  if (!user || !user._id) {
    errors.push('User information is required');
  }

  // Validate address
  if (!addressInfo) {
    errors.push('Address information is required');
  } else {
    if (!addressInfo.address) errors.push('Address is required');
    if (!addressInfo.city) errors.push('City is required');
    if (!addressInfo.pincode) errors.push('Pincode is required');
    if (!addressInfo.phone) errors.push('Phone is required');
  }

  // Calculate total if not provided
  let calculatedTotal = totalAmount;
  if (!calculatedTotal && cartItems) {
    calculatedTotal = cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);
  }

  return {
    isValid: errors.length === 0,
    errors,
    calculatedTotal
  };
};

function Checkout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          ((currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem.price) * currentItem.quantity),
        0
      )
      : 0;

  const handleCheckout = async () => {
    // Check if address is selected
    if (currentSelectedAddress === null) {
      toast({
        title: 'Please select an address',
        variant: 'destructive',
      });
      return;
    }

    // Check if cart is empty
    if (!cartItems?.items || cartItems.items.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Please add items to your cart before checkout.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare checkout items - NOW INCLUDING PRODUCT ID
      const checkoutItems = cartItems.items.map((singleCartItem) => {
        // Validate that productId exists
        if (!singleCartItem.productId && !singleCartItem._id) {
          throw new Error(`Product ID missing for item: ${singleCartItem.title}`);
        }

        return {
          productId: singleCartItem.productId || singleCartItem._id, // Use productId or fallback to _id
          title: singleCartItem?.title,
          image: singleCartItem?.image,
          price:
            singleCartItem?.salePrice > 0
              ? singleCartItem?.salePrice
              : singleCartItem?.price,
          quantity: singleCartItem?.quantity,
          // Include additional fields that might be useful
          category: singleCartItem?.category,
          description: singleCartItem?.description,
          brand: singleCartItem?.brand,
        };
      });

      // Log the checkout items to verify productId is included
      console.log('🛒 Checkout items with product IDs:', checkoutItems);

      // Prepare user data
      const userData = {
        _id: user._id,
        email: user.email,
      };

      // Prepare address data
      const addressData = {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes || '',
      };

      // Validate all data before sending
      const validation = validateCheckoutData(
        checkoutItems,
        userData,
        addressData,
        totalCartAmount
      );

      if (!validation.isValid) {
        console.error('Validation errors:', validation.errors);
        toast({
          title: 'Checkout Validation Failed',
          description: validation.errors.join(', '),
          variant: 'destructive',
        });
        return;
      }

      console.log('✅ Validation passed, proceeding to checkout');
      console.log('📦 Checkout data:', {
        cartItems: checkoutItems,
        user: userData,
        addressInfo: addressData,
        totalAmount: validation.calculatedTotal
      });

      // Initialize Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Create checkout session
      const response = await axios.post(
        'http://localhost:3000/api/stripe/create-checkout-session',
        {
          cartItems: checkoutItems,
          user: userData,
          addressInfo: addressData,
          totalAmount: validation.calculatedTotal,
        }
      );

      console.log('🚀 Checkout session response:', response.data);

      // Redirect to Stripe Checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('No checkout URL received from server');
      }

    } catch (error) {
      console.error('Stripe checkout error:', error);
      
      // Handle different types of errors
      let errorMessage = 'Unable to proceed with checkout. Please try again.';
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.';
      } else {
        // Other errors
        errorMessage = error.message || errorMessage;
      }

      toast({
        title: 'Checkout Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="account image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          currentSelectedAddress={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          customClass="sm:grid-row-1 md:grid-row-2"
        />
        <div className="flex flex-col gap-4">
          {cartItems &&
            cartItems.items &&
            cartItems.items.length > 0 &&
            cartItems.items.map((item) => (
              <UserCartContents key={item.productId || item._id} cartItem={item} />
            ))}
          
          {/* Show message if cart is empty */}
          {(!cartItems?.items || cartItems.items.length === 0) && (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.{totalCartAmount}</span>
            </div>
          </div>

          <div className="mt-5">
            <Button 
              className="w-full" 
              onClick={handleCheckout}
              disabled={
                isLoading || 
                !cartItems?.items || 
                cartItems.items.length === 0 || 
                !currentSelectedAddress
              }
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                'Checkout With Stripe'
              )}
            </Button>
          </div>

          {/* Helper text */}
          <div className="text-sm text-gray-500 text-center">
            {!currentSelectedAddress && 'Please select an address to proceed'}
            {currentSelectedAddress && cartItems?.items?.length === 0 && 'Your cart is empty'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;