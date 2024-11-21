import { Router } from "express";
import { getFilteredProducts } from "../controllers/shopproducts.js";

const shopProductRouter = new Router()

shopProductRouter.get('/get', getFilteredProducts)


export default shopProductRouter