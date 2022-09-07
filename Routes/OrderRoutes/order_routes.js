const express = require('express');
const addOrder = require('../../Controllers/OrderController/addOrder');
const getOrder = require('../../Controllers/OrderController/getOrder')
const authController = require("../../Controllers/auth_controller");
const router = express.Router();


router.post('/addOrder', authController.protect, addOrder);
router.get('/getOrder', authController.protect, getOrder);

module.exports = router;