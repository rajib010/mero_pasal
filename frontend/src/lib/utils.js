import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstWord(str) {
  if (!str) return str;
  const words = str.split(' '); 
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' '); 
}

export const validateCheckoutData = (cartItems, user, addressInfo, totalAmount) => {
  const errors = [];

  // Validate cart items
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    errors.push('Cart is empty');
  } else {
    cartItems.forEach((item, index) => {
      if (!item.title) errors.push(`Item ${index + 1}: Title is required`);
      if (!item.price || isNaN(item.price)) errors.push(`Item ${index + 1}: Valid price is required`);
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