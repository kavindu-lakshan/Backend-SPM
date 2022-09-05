const express = require("express");
const router = express.Router();
const ItemController = require('../../Controllers/SupplierController/itemController')

router.route("/additem")
    .post(ItemController.Store);

router.route("/getall")
    .get(ItemController.AllItems); 
    
router.route("/update/:id")
    .put(ItemController.UpdateItem);   
    
router.route("/delete/:id")
    .delete(ItemController.DeleteItem);      

module.exports = router;

