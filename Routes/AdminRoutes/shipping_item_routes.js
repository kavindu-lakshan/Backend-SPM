const shipping_item = require("../../Controllers/AdminController/shipping_item");
const authController = require("../../Controllers/auth_controller");
const express = require("express");
const router = express.Router();


router.route("/")
    .get(authController.protect,shipping_item.getShippingItems)
    .put(shipping_item.updateShippingItem)
    // .post(authController.protect,shipping_item.update_shipping_state)

router.route("/:id")
    .get(authController.protect,shipping_item.getItem)
    .put(shipping_item.updateShippingItem)

module.exports = router;
