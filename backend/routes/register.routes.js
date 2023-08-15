const express = require('express');
const router = express.Router();
const { createUser, activateUser } = require('../controllers/register.controller');
const upload = require('../middlewares/uploadfile');

router.post('/', upload.single('image'), createUser);
router.post('/verify', activateUser);

module.exports = router;
