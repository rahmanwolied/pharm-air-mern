const express = require('express');
const { seedUser, seedProducts } = require('../controllers/seedEntries.controller');
const router = express.Router();

router.get('/users', seedUser);
router.get('/users/:count', seedUser);
router.get('/products', seedProducts);

module.exports = router;
