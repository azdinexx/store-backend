const Cart = require('../model/Cart');
const extractIdFromToken = require('../../middleware/extractID');

const createNewCart = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(' ')[1];
  const id = extractIdFromToken(token);
  const { porductID, Quantity } = req.body;
  let quantity = Quantity || 1;

  const notfoundcart = await Product.find({ SKU: SKU });
  if (notfoundcart)
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

const updateCart = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(' ')[1];
  const id = extractIdFromToken(token);

  const cart = await Cart.findOne({ userId: id }).exec();
  if (!cart) {
    return res
      .status(204)
      .json({ message: `No cart matches user ID ${req.body.id}.` });
  }
  const result = await Cart.findByIdAndUpdate(cart._id, {
    ...prev,
    productId: req.body.productId,
    quantity: quan,
  });
  res.json(result);
};

const getCart = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(' ')[1];
  const id = extractIdFromToken(token);

  const cart = await Cart.findOne({ userId: id }).exec();
  if (!cart) {
    return res
      .status(204)
      .json({ message: `No cart matches this user ID: ${id}.` });
  }
  res.json(cart);
};

module.exports = {
  updateCart,
  getCart,
};
