const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

// you can pass a varibale to express router with ( : ) to handel specific router
router.get("/products/:productId", shopController.getProduct); // /products/:productId => /products/154648744

// ye nokte ke khili mohem ine ke age shoma ye route mesle route zir dashte bashid bayad hatam balaye route /products/:productId bezarid zira ina route hashon az ye rishe hastan va chon /products/:productId balast hich vaght be route paiin nemirese ke ejra beshe yani chi yani age daynamic darid mesle delete oono bala bezarid . vali age specific darid mesle /products/:productId ke variableiye oono paiin bezarid
// router.get("/products/delete");

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
