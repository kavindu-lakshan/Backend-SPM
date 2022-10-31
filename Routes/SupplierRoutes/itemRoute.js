const express = require("express");
const router = express.Router();
const ItemController = require('../../Controllers/SupplierController/itemController');
const RequestController = require('../../Controllers/SupplierController/requestController')
const authController = require('../../Controllers/auth_controller');

router.route("/additem")
    .post(authController.protect, ItemController.Store);

router.route("/getall")
    .get(authController.protect, ItemController.AllItems);

router.route("/getallitems")
    .get(authController.protect, ItemController.AllItemsToDropDown);

router.route("/update/:id")
    .put(authController.protect, ItemController.UpdateItem);

router.route("/delete/:id")
    .delete(authController.protect, ItemController.DeleteItem);

router.route("/getallrequest")
    .get(authController.protect, RequestController.AllRequests); 
    
router.route("/updatereq/:id")
    .get(authController.protect,RequestController.getRequest)
    .put(authController.protect, RequestController.UpdateRequest);    

module.exports = router;

