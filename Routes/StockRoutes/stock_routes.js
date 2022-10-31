const express = require("express");
const router = express.Router();
const StockController = require("../../Controllers/StockController/stock_controller");
const getStock = require("../../Controllers/StockController/getStock");
const getRequest = require("../../Controllers/StockController/stock_controller");
const RequestController = require("../../Controllers/SupplierController/requestController");
const AuthController = require("../../Controllers/auth_controller");
const getPurchaseOrders = require("../../Controllers/StockController/getPurchaseOrders")
const updatePurchaseOrder = require("../../Controllers/StockController/updatePurchaseOrder")
const deletePurchaseOrder = require("../../Controllers/StockController/deletePurchaseOrder")

router.post("/addstock", StockController.Stock);

router.route("/getall").get(getStock);

router.route("/getPurchaseOrders").get(getPurchaseOrders);

router.route("/getallRequest").get(getRequest.AllStockManagerRequests);

router.route("/update/:id").put(StockController.UpdateStock);

router.route("/delete/:id").delete(StockController.DeleteStock);

router.route("/makeRequest").post(RequestController.Store);

router.route("/updatePurchaseOrder").post(updatePurchaseOrder);

router.route("/deletePurchaseOrder").post(deletePurchaseOrder);

module.exports = router;
