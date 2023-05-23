const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .post(verifyRoles(ROLES_LIST.Admin), productsController.createNewProduct)
  .get(verifyRoles(ROLES_LIST.Admin), productsController.getAllProducts)
  //.get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  .delete(
    verifyRoles(ROLES_LIST.Admin),
    verifyRoles(ROLES_LIST.Admin),
    productsController.deleteProduct
  );

router
  .route('/:id')
  .get(verifyRoles(ROLES_LIST.Admin), productsController.getProduct);

module.exports = router;
