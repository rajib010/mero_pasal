import { Product } from "../models/product.js";

const getFilteredProducts = async (req, res) => {
  try {
    const query = Object.keys(req.query).reduce((acc, key) => {
      acc[key.toLowerCase()] = req.query[key];
      return acc;
    }, {});

    const { category = "", brand = "", sortby = "price-lowtohigh" } = query;

    let filters = {};

    if (category) {
      filters.category = { $in: category.split(",") };
    }

    if (brand) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortby) {
      case "price-lowtohigh":
        sort.price = 1;
        break;

      case "price-hightolow":
        sort.price = -1;
        break;

      case "title-atoz":
        sort.title = 1;
        break;

      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.error("Error fetching filtered products:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export { getFilteredProducts };
