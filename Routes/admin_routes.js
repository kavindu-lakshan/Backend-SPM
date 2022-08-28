const express = require("express");
const staffController = require("../Controllers/AdminController/staff_controller");
const authController = require("../Controllers/auth_controller");
const router = express.Router();

//This api-resource route for update and delete specific student
router.route("/")
    .get(staffController.allStaff)
    .post(staffController.createStaff)


router.route("/:id")
    .patch(authController.protect, authController.restrictTo('student'), staffController.updateStaff)
    .delete(authController.protect, authController.restrictTo('student'), staffController.deleteStaff);

module.exports = router;
