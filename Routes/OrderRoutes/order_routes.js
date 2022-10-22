const express = require('express');
const addOrder = require('../../Controllers/OrderController/addOrder');
const getOrder = require('../../Controllers/OrderController/getOrder')
const updateOrder = require('../../Controllers/OrderController/updateOrder')
const authController = require("../../Controllers/auth_controller");
const deleteOrder = require('../../Controllers/OrderController/deleteOrder');
const getCanceledOrders = require('../../Controllers/OrderController/getCanceledOrders');
const router = express.Router();


router.post('/addOrder', authController.protect, addOrder);
router.get('/getOrder', authController.protect, getOrder);
router.get('/getCanceledOrders', authController.protect, getCanceledOrders);
router.post('/updateOrder', authController.protect, updateOrder);
router.delete('/deleteOrder/:id', authController.protect, deleteOrder);

module.exports = router;