const express = require('express');

const { seedUser, seedProducts } = require('../controllers/seedEntries.controller');
const uploadFile = require('../middlewares/uploadfile');
const { userUploadFile, productUploadFile } = require('../src/secret');

const router = express.Router();

const uploadUser = uploadFile(userUploadFile);
const uploadProduct = uploadFile(productUploadFile);

router.get('/users', uploadUser.single('image'), seedUser);
router.get('/users/:count', uploadUser.single('image'), seedUser);
router.get('/products', uploadProduct.single('image'), seedProducts);

router.get('/products', seedProducts);

module.exports = router;
