const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.Admin), cartController.getAllCarts)
  .delete(verifyRoles(ROLES_LIST.Admin), cartController.deleteProduct);

router
  .route('/:id')
  .post(verifyRoles(ROLES_LIST.User), cartController.updateCart)
  .get(verifyRoles(ROLES_LIST.User), cartController.getCart);

module.exports = router;
