const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

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
    console.log(erro);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new products
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreatedProduct = Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
    res
      .json({
        success: true,
        data: newlyCreatedProduct,
      })
      .status(201);
  } catch (e) {
    res
      .json({
        success: false,
        message: "Error occured",
      })
      .status(500);
  }
};

//fech all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res
      .json({
        success: true,
        data: listOfProducts,
      })
      .status(201);
  } catch (e) {
    res
      .json({
        success: false,
        message: "Error occured",
      })
      .status(500);
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);

    if (!findProduct)
      return res
        .json({ success: false, message: "Product not Found" })
        .status(404);

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === '' ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();

    res
      .json({
        success: true,
        message: findProduct,
      })
      .status(200);
  } catch (e) {
    res
      .json({
        success: false,
        message: "Error occured",
      })
      .status(500);
  }
};

//delete a products
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res
        .json({
          success: false,
          message: "Product not Found",
        })
        .status(404);

    res
      .json({
        success: true,
        message: "Product deleted successfully",
      })
      .status(404);
  } catch (e) {
    res
      .json({
        success: false,
        message: "Error occured",
      })
      .status(500);
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
