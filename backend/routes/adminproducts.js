import { Router } from "express";
import { upload } from "../utility/cloudinary.js";
import { handleImageUpload, addProduct, fetchAllProducts, deleteProduct, updateProduct } from "../controllers/adminproducts.js";

const adminProductRouter = new Router()

adminProductRouter.post('/upload-image', upload.single('my_file'), handleImageUpload)
adminProductRouter.post('/add', addProduct)
adminProductRouter.put('/update/:productId', updateProduct)
adminProductRouter.delete('/delete/:productId', deleteProduct)
adminProductRouter.get('/get', fetchAllProducts)

export default adminProductRouter