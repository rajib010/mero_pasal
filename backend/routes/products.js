import { Router } from "express";
import { upload } from "../utility/cloudinary.js";
import { handleImageUpload, addProduct, fetchAllProducts, deleteProduct, updateProduct } from "../controllers/products.js";

const productRouter = new Router()

productRouter.post('/upload-image', upload.single('my_file'), handleImageUpload)
productRouter.post('/add', addProduct)
productRouter.put('/update/:productId', updateProduct)
productRouter.delete('/delete/:productId', deleteProduct)
productRouter.get('/get', fetchAllProducts)

export default productRouter