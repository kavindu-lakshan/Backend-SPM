const express = require("express");
const router = express.Router();
const StockController = require("../../Controllers/StockController/stock_controller");
const getStock = require("../../Controllers/StockController/getStock");
const AuthController = require("../../Controllers/auth_controller");

router.post("/addstock", StockController.Stock);

router.route("/getall").get(getStock);

router.route("/update/:id").put(StockController.UpdateStock);

router.route("/delete/:id").delete(StockController.DeleteStock);

module.exports = router;
