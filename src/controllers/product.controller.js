const productsModel= require("../models/product.model");


const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const result = await productsModel.getProducts(query);
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

// params => ada 2
// query params (search, filter, sort, paginasi) => params yang kita gunakanan untuk melakukan manipulasi data
// req.query
// path params (get detail, get product) => variabel variable sql yang kita gunakan untuk mendapat sesuatu data yang lebih spesifik
// req.params

const getProductDetail = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.getProductDetail(params);
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};


const insertProducts = async (req, res) => {
  try {
    const { body } = req
    const result = await productsModel.insertProducts(body);
    res.status(201).json({
      data: result.rows,
      msg: "Create Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { params, body } = req;
    const result = await productsModel.updateProduct(params, body);
    res.status(200).json({
      data: result.rows,
      msg: "Update Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.deleteProduct(params);
    res.status(200).json({
      data: result.rows,
      msg: "Delete Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
  insertProducts,
  getProductDetail,
  updateProduct,
  deleteProduct
};