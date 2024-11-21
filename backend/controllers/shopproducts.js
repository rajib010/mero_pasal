import { Product } from "../models/product.js";


const getFilteredProducts = async(req,res)=>{
    console.log('route hit');
    
    try {
        const products = await Product.find({})

        return res.status(200).json({
            success:true,
            message:'Fetched filtered products successfully',
            data:products
        })
    } catch (error) {
        console.log('Error getting filtered products');
        return res.status(500).json({
            success:false,
            message:"failed to get filtered products"
        })
    }
}

export {getFilteredProducts}