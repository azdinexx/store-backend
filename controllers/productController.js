const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) return res.status(204).json({ message: 'No products found.' });
  res.json(products);
};

const createNewProduct = async (req, res) => {
  const { title, description, SKU, price } = req.body;
  if (!title || !description || !SKU || !price) {
    return res
      .status(400)
      .json({ message: 'title, description, SKU, price are required' });
  }
  const duplicates = await Product.find({ SKU: SKU });
  if (duplicates)
    return res.status(409).json({ message: 'SKU should be unique' });
  try {
    const result = await Product.create({
      title,
      SKU,
      description,
      images: req.body.images,
      categories: req.body.categories,
      tags: req.body.tags,
      price,
      dicountPrice,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateProduct = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }

  const product = await Product.findOne({ _id: req.body.id }).exec();
  if (!product) {
    return res
      .status(204)
      .json({ message: `No product matches ID :${req.body.id}.` });
  }
  if (req.body?.title) product.title = req.body.title;
  if (req.body?.SKU) product.SKU = req.body.SKU;
  if (req.body?.description) product.description = req.body.description;
  if (req.body?.images) product.images = req.body.images;
  if (req.body?.categories) product.categories = req.body.categories;
  if (req.body?.tags) product.tags = req.body.tags;
  if (req.body?.price) product.price = req.body.price;
  if (req.body?.dicountPrice) product.dicountPrice = req.body.dicountPrice;

  const result = await product.save();
  res.json(result);
};

const deleteProduct = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: 'Product ID required.' });

  const product = await Product.findOne({ _id: req.body.id }).exec();
  if (!product) {
    return res
      .status(204)
      .json({ message: `No product matches ID ${req.body.id}.` });
  }
  const result = await product.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Product ID required.' });

  const product = await Product.findOne({ _id: req.params.id }).exec();
  if (!product) {
    return res
      .status(204)
      .json({ message: `No product matches ID ${req.params.id}.` });
  }
  res.json(employee);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
