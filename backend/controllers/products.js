import { imageUploadUtil } from '../utility/cloudinary.js'
import { Product } from '../models/product.js';
import { isValidObjectId } from 'mongoose';

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
    const newProduct = new Product({
      image, title, description, category, brand, price, salePrice, totalStock
    })
    const result = await newProduct.save();
    if (!result) {
      throw new Error('Error in adding new product')
    }
    return res.status(200).json({
      success: true,
      message: 'Added new product successfully',
      data: newProduct
    })
  } catch (error) {
    console.log('Error during adding product', error);
    return res.status(500).json({
      success: false,
      message: 'Error during adding product'
    })
  }
}

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({})
    return res.status(200).json({
      success: true,
      message: 'All the products are fetched successfully',
      data: listOfProducts
    })
  } catch (error) {
    console.log('Error during fetching all products', error);
    return res.status(500).json({
      success: false,
      message: 'Error during fetching all products'
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!isValidObjectId(productId)) {
      throw new Error("Not a valid product id")
    }
    const product = await Product.findByIdAndDelete(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Product successfully deleted'
    })
  } catch (error) {
    console.log('Error during deleting product', error);
    return res.status(500).json({
      success: false,
      message: 'Error during deleting product'
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { image, title, description, category, brand, price, salePrice, totalStock, averageReview } = req.body;
    if (!isValidObjectId(productId)) {
      throw new Error("not valid product id")
    }
    const existingProduct = await Product.findById(productId)
    if (!existingProduct) {
      throw new Error('Product doesnot exist.')
    }

    existingProduct.title = title || existingProduct.title;
    existingProduct.description = description || existingProduct.description;
    existingProduct.category = category || existingProduct.category;
    existingProduct.brand = brand || existingProduct.brand;
    existingProduct.price = price === "" ? 0 : price || existingProduct.price;
    existingProduct.salePrice =
      salePrice === "" ? 0 : salePrice || existingProduct.salePrice;
    existingProduct.totalStock = totalStock || existingProduct.totalStock;
    existingProduct.image = image || existingProduct.image;
    existingProduct.averageReview = averageReview || existingProduct.averageReview;

    await existingProduct.save()
    return res.status(200).json({
      success: true,
      message: 'Product info updated successfully',
      data: existingProduct
    })

  } catch (error) {
    console.log('Error during updating product', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error during updating product'
    })
  }
}

export { handleImageUpload, addProduct, fetchAllProducts, deleteProduct, updateProduct }