const express = require("express");
const router = express.Router();
const StockController = require("../../Controllers/StockController/stock_controller");
const AuthController = require("../../Controllers/auth_controller");

router.post("/addstock", StockController.Stock);

router.route("/getall").get(StockController.AllStocks);

router.route("/update/:id").put(StockController.UpdateStock);

router.route("/delete/:id").delete(StockController.DeleteStock);

module.exports = router;
