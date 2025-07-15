import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { Order } from '../models/order.js';
import { deleteCartByUserId } from '../utility/cartItemsDelete.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('📦 Received event:', event.type);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      try {
        const userId = session.metadata.userId;
        const cartItems = JSON.parse(session.metadata.cartItems);
        const addressInfo = JSON.parse(session.metadata.addressInfo);
        const totalAmount = parseFloat(session.metadata.totalAmount);

        console.log('🛒 Processing order for user:', userId);

        // Create the order
        const newOrder = await Order.create({
          userId,
          cartItems,
          addressInfo,
          orderStatus: 'Confirmed',
          paymentMethod: 'Stripe',
          paymentStatus: 'Paid',
          totalAmount,
          orderDate: new Date(),
          orderUpdateDate: new Date(),
          paymentId: session.payment_intent,
          payerId: session.customer,
        });

        console.log('✅ Order created:', newOrder._id);

        // Delete the cart after successful order creation
        await deleteCartByUserId(userId);
        
        console.log('🗑️ Cart cleared for user:', userId);

      } catch (error) {
        console.error('❌ Error processing checkout session:', error);
        // Don't return error to Stripe to avoid retries for unrecoverable errors
        // unless it's a temporary issue
      }
      break;

    case 'payment_intent.succeeded':
      console.log('💳 Payment succeeded:', event.data.object.id);
      break;

    default:
      console.log('🔄 Unhandled event type:', event.type);
  }

  res.status(200).json({ received: true });
};

export default webhookHandler;