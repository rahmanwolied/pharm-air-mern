const express = require('express');
const router = express.Router();
const { createUser, activateUser } = require('../controllers/register.controller');
const uploadFile = require('../middlewares/uploadfile');
const { userUploadFile } = require('../src/secret');

const upload = uploadFile(userUploadFile);

router.post('/', upload.single('image'), createUser);
router.post('/verify', activateUser);

module.exports = router;
