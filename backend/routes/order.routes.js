const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { handleGetAllOrders, handleGetOrders, handleUpdateOrder } = require('../controllers/order.controller');
const router = express.Router();

router.get('/', handleGetAllOrders);
router.get('/:id', isLoggedIn, handleGetOrders);
router.post('/update', isLoggedIn, isAdmin, handleUpdateOrder);

module.exports = router;
