import { Cart } from '../models/cart.js';

export const deleteCartByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error('UserId is required');
    }

    const result = await Cart.findOneAndDelete({ userId });

    if (!result) {
      console.warn(`🟠 No cart found for userId: ${userId}`);
      return false;
    }

    console.log(`✅ Cart deleted for userId: ${userId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error deleting cart for userId: ${userId}`, error);
    throw error;
  }
};