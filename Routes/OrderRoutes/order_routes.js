const express = require('express');
const addOrder = require('../../Controllers/OrderController/addOrder');
const getOrder = require('../../Controllers/OrderController/getOrder')
const updateOrder = require('../../Controllers/OrderController/updateOrder')
const authController = require("../../Controllers/auth_controller");
const router = express.Router();


router.post('/addOrder', authController.protect, addOrder);
router.get('/getOrder', authController.protect, getOrder);
router.post('/updateOrder', authController.protect, updateOrder);

module.exports = router;