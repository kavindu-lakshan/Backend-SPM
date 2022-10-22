const express = require("express");
const staffController = require("../../Controllers/AdminController/staff_controller");
const authController = require("../../Controllers/auth_controller");
const router = express.Router();

//This api-resource route for update and delete specific Staff
router.route("/staff")
    .get(authController.protect,staffController.allStaff)
    .post(authController.protect,staffController.createStaff)



router.route("/staff/:id")
    .put(authController.protect,  staffController.updateStaff)
    .delete(authController.protect,  staffController.deleteStaff);

module.exports = router;
