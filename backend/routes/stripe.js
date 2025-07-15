import { Router } from "express";
import { createCheckoutSession } from "../controllers/stripe.js";

const router = Router();

router.post('/create-checkout-session', createCheckoutSession)

export default router