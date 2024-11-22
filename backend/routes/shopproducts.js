import { Router } from "express";
import { getFilteredProducts, getProductDetails } from "../controllers/shopproducts.js";

const shopProductRouter = new Router()

shopProductRouter.get('/get', getFilteredProducts)
shopProductRouter.get("/getproduct/:id", getProductDetails)


export default shopProductRouter