import Stripe from "stripe"

export const createCheckoutSession = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { cartItems, user, addressInfo, totalAmount } = req.body;

    // Validation
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart items are required and must be a non-empty array' });
    }

    if (!user || !user._id) {
        return res.status(400).json({ error: 'User information is required' });
    }

    if (!addressInfo) {
        return res.status(400).json({ error: 'Address information is required' });
    }

    // Calculate total amount from cart items if not provided
    let calculatedTotal = totalAmount;
    if (!calculatedTotal) {
        calculatedTotal = cartItems.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems.map(item => {
                // Validate each item
                if (!item.title || !item.price || !item.quantity) {
                    throw new Error(`Invalid cart item: ${JSON.stringify(item)}`);
                }

                // Validate productId exists
                if (!item.productId && !item._id) {
                    throw new Error(`Product ID is missing for item: ${item.title}`);
                }

                const productData = {
                    name: item.title,
                    metadata: {
                        productId: (item.productId || item._id).toString(), 
                        ...(item.category && { category: item.category }),
                        ...(item.description && { description: item.description }),
                    }
                };
                
                if (item.image && item.image.trim() !== '') {
                    productData.images = [item.image];
                }

                return {
                    price_data: {
                        currency: 'npr',
                        product_data: productData,
                        unit_amount: Math.round(parseFloat(item.price)*100) // Ensure integer
                    },
                    quantity: parseInt(item.quantity),
                };
            }),
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/failure`,
            metadata: {
                userId: user._id.toString(),
                cartItems: JSON.stringify(cartItems.map(item => ({
                    productId: (item.productId || item._id).toString(),
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    category: item.category,
                    description: item.description
                }))),
                addressInfo: JSON.stringify(addressInfo),
                totalAmount: calculatedTotal.toString(),
            },
            // Optional: Add customer email if available
            ...(user.email && { customer_email: user.email }),
        });

        console.log("✅ Checkout session created:", session.id);
        return res.status(200).json({ 
            url: session.url, 
            sessionId: session.id,
            totalAmount: calculatedTotal 
        });

    } catch (err) {
        console.error("❌ Checkout session creation failed:", err);
        res.status(500).json({ error: err.message });
    }
};